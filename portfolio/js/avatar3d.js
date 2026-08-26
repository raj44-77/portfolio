/* ============ 3D AVATAR — Premium Upper Body ============ */
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

  const scene = new THREE.Scene();
  scene.background = null;

  // Camera — upper body framing, not too close
  const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 20);
  camera.position.set(0, 1.55, 2.4);
  camera.lookAt(0, 1.45, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.appendChild(renderer.domElement);

  // Professional lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(2, 3, 3);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xFF6B2C, 3);
  rimLight.position.set(-2, 2, -2);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0xffb37a, 1.2);
  fillLight.position.set(0, 1.5, -2);
  scene.add(fillLight);

  // Subtle background glow
  const glowGeometry = new THREE.PlaneGeometry(6, 6);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF6B2C,
    transparent: true,
    opacity: 0.04,
  });
  const glowPlane = new THREE.Mesh(glowGeometry, glowMaterial);
  glowPlane.position.z = -1;
  scene.add(glowPlane);

  // Load avatar
  const loader = new THREE.GLTFLoader();
  let avatarModel = null;

  loader.load(
    'images/avatar-v2.glb',
    (gltf) => {
      avatarModel = gltf.scene;

      const box = new THREE.Box3().setFromObject(avatarModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetHeight = 3.2; // Bigger so upper body fills frame
      const scale = targetHeight / maxDim;
      avatarModel.scale.setScalar(scale);

      // Position so upper body is centered — shift model DOWN
      // This pushes the T-pose arms below the visible frame
      avatarModel.position.y = -1.2;
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

  // Mouse tracking — subtle rotation only
  let mouseX = 0;
  let mouseY = 0;
  let currentRotY = 0;
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

  // Animation
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    if (avatarModel) {
      // Very subtle rotation — just slight sway
      targetRotY += delta * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.03;

      avatarModel.rotation.y = currentRotY + mouseX * 0.3;
      avatarModel.rotation.x = -mouseY * 0.08;
    }

    // Camera subtle movement
    camera.position.x = mouseX * 0.2;
    camera.position.y = 1.55 + mouseY * 0.15 + Math.sin(time * 1.2) * 0.02;
    camera.lookAt(0, 1.45, 0);

    renderer.render(scene, camera);
  }
  animate();

  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onResize);
})();
