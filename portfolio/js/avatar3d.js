/* ============ 3D AVATAR — Kumar Raj (Premium) ============ */
(function () {
  const container = document.getElementById('avatar3d');
  if (!container) return;

  const loadingEl = document.createElement('div');
  loadingEl.className = 'avatar-loading';
  loadingEl.textContent = 'Loading 3D Avatar...';
  container.appendChild(loadingEl);

  if (typeof THREE === 'undefined') {
    loadingEl.textContent = '3D not supported';
    return;
  }

  // Scene
  const scene = new THREE.Scene();
  scene.background = null;

  // Camera — closer for bigger appearance
  const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 20);
  camera.position.set(0, 1.5, 2.8);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // Lighting — professional studio setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(3, 4, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xFF6B2C, 3);
  rimLight.position.set(-3, 2.5, -2);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0xffb37a, 1);
  fillLight.position.set(0, 1.5, -2);
  scene.add(fillLight);

  // Premium podium
  const podiumGeometry = new THREE.CylinderGeometry(1.5, 1.7, 0.35, 64);
  const podiumMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f0f13,
    roughness: 0.3,
    metalness: 0.7,
  });
  const podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
  podium.position.y = -0.175;
  podium.castShadow = true;
  podium.receiveShadow = true;
  scene.add(podium);

  // Orange ring on podium
  const ringGeometry = new THREE.TorusGeometry(1.55, 0.04, 32, 64);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xFF6B2C,
    roughness: 0.2,
    metalness: 0.5,
    emissive: 0xFF6B2C,
    emissiveIntensity: 0.5,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.y = 0.01;
  ring.rotation.x = -Math.PI / 2;
  scene.add(ring);

  // Ground glow
  const glowGeometry = new THREE.CircleGeometry(2.2, 64);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF6B2C,
    transparent: true,
    opacity: 0.06,
    side: THREE.DoubleSide,
  });
  const glowDisc = new THREE.Mesh(glowGeometry, glowMaterial);
  glowDisc.rotation.x = -Math.PI / 2;
  glowDisc.position.y = -0.35;
  scene.add(glowDisc);

  // Load avatar
  const loader = new THREE.GLTFLoader();
  let avatarModel = null;

  loader.load(
    'images/avatar.glb',
    (gltf) => {
      avatarModel = gltf.scene;

      // Scale bigger
      const box = new THREE.Box3().setFromObject(avatarModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetHeight = 2.6;
      const scale = targetHeight / maxDim;
      avatarModel.scale.setScalar(scale);

      // Position on podium
      avatarModel.position.y = 0;
      avatarModel.position.x = 0;
      avatarModel.position.z = 0;

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
    () => {
      loadingEl.textContent = 'Avatar failed to load';
    }
  );

  // Mouse tracking
  let mouseX = 0;
  let mouseY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) - 0.5;
    mouseY = ((e.clientY - rect.top) / rect.height) - 0.5;
    targetRotY = mouseX * 0.6;
    targetRotX = -mouseY * 0.2;
  });

  container.addEventListener('mouseleave', () => {
    targetRotY = 0;
    targetRotX = 0;
  });

  // Animation
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Smooth rotation — only camera orbits, model stays professional
    targetRotY += delta * 0.12; // Slow auto-rotate
    currentRotY += (targetRotY - currentRotY) * 0.05;
    currentRotX += (targetRotX - currentRotX) * 0.05;

    camera.position.x = Math.sin(currentRotY) * 2.8;
    camera.position.z = Math.cos(currentRotY) * 2.8;
    camera.position.y = 1.5 + currentRotX + Math.sin(time * 1.2) * 0.05;
    camera.lookAt(0, 1.25, 0);

    // Subtle ring rotation
    ring.rotation.z += delta * 0.5;

    // Glow pulsing
    glowDisc.material.opacity = 0.05 + Math.sin(time * 1.5) * 0.02;

    renderer.render(scene, camera);
  }
  animate();

  // Resize
  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onResize);
})();