/* ============ 3D AVATAR — Kumar Raj ============ */
(function () {
  const container = document.getElementById('avatar3d');
  if (!container) return;

  // Show loading text
  const loadingEl = document.createElement('div');
  loadingEl.className = 'avatar-loading';
  loadingEl.textContent = 'Loading 3D Avatar...';
  container.appendChild(loadingEl);

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    loadingEl.textContent = '3D not supported';
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = null;
  scene.fog = new THREE.Fog(0x0a0a0c, 3, 8);

  // Camera
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 20);
  camera.position.set(0, 1.6, 3.2);
  camera.lookAt(0, 1.1, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Lighting — orange rim + soft white
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2);
  mainLight.position.set(3, 4, 3);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0xFF6B2C, 2.5);
  rimLight.position.set(-3, 2, -2);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0xffb37a, 0.8);
  fillLight.position.set(0, 1, -2);
  scene.add(fillLight);

  // Ground glow
  const glowGeometry = new THREE.CircleGeometry(1.8, 64);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF6B2C,
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide
  });
  const glowDisc = new THREE.Mesh(glowGeometry, glowMaterial);
  glowDisc.rotation.x = -Math.PI / 2;
  glowDisc.position.y = -0.01;
  scene.add(glowDisc);

  // Load GLB model
  const loader = new THREE.GLTFLoader();
  let avatarModel = null;

  loader.load(
    'images/avatar.glb',
    (gltf) => {
      avatarModel = gltf.scene;
      
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(avatarModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetHeight = 2.2;
      const scale = targetHeight / maxDim;
      
      avatarModel.scale.setScalar(scale);
      
      // Position so feet are at y=0
      avatarModel.position.y = -box.min.y * scale;
      avatarModel.position.x = -center.x * scale;
      avatarModel.position.z = -center.z * scale;

      // Enable shadows
      avatarModel.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      scene.add(avatarModel);
      loadingEl.classList.add('hidden');
    },
    (progress) => {
      const percent = Math.floor((progress.loaded / progress.total) * 100);
      loadingEl.textContent = `Loading... ${percent}%`;
    },
    (error) => {
      loadingEl.textContent = 'Avatar failed to load';
      console.error('GLB load error:', error);
    }
  );

  // Mouse tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) - 0.5;
    mouseY = ((e.clientY - rect.top) / rect.height) - 0.5;
  });

  container.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  // Touch support
  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.touches[0].clientX - rect.left) / rect.width) - 0.5;
      mouseY = ((e.touches[0].clientY - rect.top) / rect.height) - 0.5;
    }
  }, { passive: true });

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    if (avatarModel) {
      // Auto-rotation + mouse influence
      targetRotY += 0.15 * delta;
      targetRotX += (mouseY * 0.3 - targetRotX) * 0.05;
      
      avatarModel.rotation.y = targetRotY + mouseX * 0.5;
      avatarModel.rotation.x = targetRotX;
      
      // Subtle floating
      avatarModel.position.y = Math.sin(time * 1.2) * 0.05;
    }

    // Camera subtle sway
    camera.position.x = mouseX * 0.4;
    camera.position.y = 1.6 + mouseY * 0.3;
    camera.lookAt(0, 1.1, 0);

    renderer.render(scene, camera);
  }
  animate();

  // Resize handling
  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onResize);
})();