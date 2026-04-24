import { useEffect, useRef } from 'react';
import * from 'three';

function hashCoords(x, y, salt = 0) {
  const h = Math.sin(x * 12.9898 + y * 78.233 + salt) * 43758.5453;
  return h - Math.floor(h);
}

export default function CipherMatrix() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const GRID_SIZE = isMobile ? 28 : 40;
    const frustumSize = isMobile ? 20 : 25;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x162238);

    const camera = new THREE.OrthographicCamera(
      -frustumSize / 2,
      frustumSize / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Shape library
    const geometries = [];

    // 1. Hexagon
    const hexShape = new THREE.Shape();
    const hexRadius = 0.35;
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3;
      const px = hexRadius * Math.cos(a);
      const py = hexRadius * Math.sin(a);
      if (i === 0) hexShape.moveTo(px, py);
      else hexShape.lineTo(px, py);
    }
    hexShape.closePath();
    geometries.push(new THREE.ShapeGeometry(hexShape));

    // 2. Diamond
    const diamondShape = new THREE.Shape();
    diamondShape.moveTo(0, 0.35);
    diamondShape.lineTo(0.35, 0);
    diamondShape.lineTo(0, -0.35);
    diamondShape.lineTo(-0.35, 0);
    diamondShape.closePath();
    geometries.push(new THREE.ShapeGeometry(diamondShape));

    // 3. Circle
    geometries.push(new THREE.CircleGeometry(0.35, 32));

    // 4. X (cross)
    const xShape = new THREE.Shape();
    xShape.moveTo(-0.25, -0.35);
    xShape.lineTo(-0.1, -0.1);
    xShape.lineTo(-0.25, 0.15);
    xShape.lineTo(-0.15, 0.25);
    xShape.lineTo(0, 0);
    xShape.lineTo(0.15, 0.25);
    xShape.lineTo(0.25, 0.15);
    xShape.lineTo(0.1, -0.1);
    xShape.lineTo(0.25, -0.35);
    xShape.lineTo(0.15, -0.45);
    xShape.lineTo(0, -0.2);
    xShape.lineTo(-0.15, -0.45);
    xShape.closePath();
    geometries.push(new THREE.ShapeGeometry(xShape));

    // 5. Square (BoxGeometry is 3D, need to handle differently)
    const squareGeom = new THREE.BoxGeometry(0.6, 0.6, 0.1);
    geometries.push(squareGeom);

    // Material
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      metalness: 0.3,
    });

    // Create one instanced mesh per geometry type
    const meshes = [];
    const geometryIndices[] = [];

    for (let i = 0; i < geometries.length; i++) {
      const mesh = new THREE.InstancedMesh(
        geometries[i],
        material.clone(),
        GRID_SIZE * GRID_SIZE
      );
      mesh.count = 0; // Start with 0 visible
      meshes.push(mesh);
      scene.add(mesh);
    }

    // Grid and cells
    const spacing = 1.0;
    const totalSize = GRID_SIZE * spacing;
    const offset = totalSize / 2;

        const cells = [];
    const transforms = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      cells[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        const i = row * GRID_SIZE + col;
        const cell = {
          index: i,
          col,
          row,
          x: col * spacing - offset,
          y: 0,
          z: row * spacing - offset,
          baseY: 0,
          currentY: 0,
          scalePhase: Math.random() * Math.PI * 2,
          scaleSpeed: 0.5 + Math.random() * 1.5,
          baseScale: 0.3 + Math.random() * 0.4,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          active: Math.random() > 0.1,
          hashPhase: Math.random() * Math.PI * 2,
          hashSpeed: 0.2 + Math.random() * 0.8,
          colorPhase: Math.random() * Math.PI * 2,
        };
        cells[row][col] = cell;

        // Assign random geometry
        const geomIdx = Math.floor(Math.random() * geometries.length);
        geometryIndices[i] = geomIdx;

        // Increment count for this geometry mesh
        meshes[geomIdx].count++;

        // Create transform
        const transform = new THREE.Object3D();
        transforms.push(transform);
      }
    }

    // We need to track which cell goes to which instance of which mesh
    // Reorganize: assign cells to mesh instances
    const meshInstanceMap = [];
    const meshCounters[] = new Array(geometries.length).fill(0);

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const i = row * GRID_SIZE + col;
        const geomIdx = geometryIndices[i];
        const instanceIdx = meshCounters[geomIdx];
        meshCounters[geomIdx]++;
        meshInstanceMap[i] = { meshIdx: geomIdx, instanceIdx };
      }
    }

    // Initialize matrices
    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshes[i];
      const identity = new THREE.Matrix4();
      for (let j = 0; j < mesh.count; j++) {
        mesh.setMatrixAt(j, identity);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xC5CDD6, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xE0BC68, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0xD4A843, 0.4, 50);
    pointLight1.position.set(0, 5, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x5A6B82, 0.3, 50);
    pointLight2.position.set(15, 8, 15);
    scene.add(pointLight2);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    const clock = new THREE.Clock();
    const color = new THREE.Color();
    const tempTransform = new THREE.Object3D();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Compute waves
      let wave1 = Math.sin(time * 0.3) * 5;
      let wave2 = Math.cos(time * 0.2) * 5;

      // Mouse interaction - 10% lerp
      wave1 = wave1 * 0.9 + mouseX * 3 * 0.1;
      wave2 = wave2 * 0.9 + mouseY * 3 * 0.1;

      const _globalPulse = Math.sin(time * 0.5) * 0.5 + 0.5;
      
      const hashShift = time * 0.4;

      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          const cell = cells[row][col];
          const i = cell.index;

          let s = cell.baseScale;

          const dist1 = Math.sqrt((cell.x - wave1) ** 2 + (cell.z - wave2) ** 2);
          const dist2 = Math.sqrt((cell.x + wave2) ** 2 + (cell.z - wave1) ** 2);
          const waveScale = Math.sin(dist1 * 0.5 - time * 1.5) * 0.3 + Math.cos(dist2 * 0.3 + time) * 0.2;
          s += waveScale;

          const hash1 = hashCoords(cell.col, cell.row, Math.floor(hashShift));
          const hash2 = hashCoords(cell.col, cell.row, Math.floor(hashShift) + 1);
          const blend = hashShift - Math.floor(hashShift);
          const hashScale = hash1 * (1 - blend) + hash2 * blend;

          const activity = Math.sin(cell.hashPhase + time * cell.hashSpeed) * 0.5 + 0.5;
          const selectionThreshold = 0.5 + Math.sin(time * 0.3) * 0.2;

          if (activity > selectionThreshold) {
            s += hashScale * 0.8;
            cell.active = true;
          } else {
            cell.active = false;
          }

          const scalePulse = Math.sin(cell.scalePhase + time * cell.scaleSpeed) * 0.1;
          s += scalePulse;
          s = Math.max(s, 0.05);

          if (cell.active) {
            cell.currentY = cell.baseY + Math.sin(time * 2 + cell.hashPhase) * 0.15;
          } else {
            cell.currentY = cell.baseY;
          }

          tempTransform.position.set(cell.x, cell.currentY, cell.z);
          tempTransform.scale.set(s, s, s);
          tempTransform.rotation.y = time * cell.rotationSpeed + (cell.active ? Math.sin(time + cell.hashPhase) * 0.5 : 0);
          tempTransform.updateMatrix();

          const { meshIdx, instanceIdx } = meshInstanceMap[i];
          meshes[meshIdx].setMatrixAt(instanceIdx, tempTransform.matrix);

          // Color
          if (s > 0.8) {
            color.setHex(0xE0BC68);
          } else if (s > 0.5) {
            color.setHex(0x8A96A8);
          } else {
            color.setHex(0x2D3A50);
          }

          if (cell.active) {
            color.lerp(new THREE.Color(0xD4A843), 0.3);
          } else {
            color.lerp(new THREE.Color(0x162238), 0.5);
          }

          meshes[meshIdx].setColorAt(instanceIdx, color);
        }
      }

      // Update all meshes
      for (let i = 0; i < meshes.length; i++) {
        meshes[i].instanceMatrix.needsUpdate = true;
        if (meshes[i].instanceColor != null) {
          meshes[i].instanceColor.needsUpdate = true;
        }
      }

      // Periodic shape morphing
      if (Math.floor(time * 10) % 20 === 0) {
        const morphHashShift = time * 0.4;
        const morphThreshold = 0.5 + Math.sin(time * 0.5) * 0.2;

        for (let row = 0; row < GRID_SIZE; row++) {
          for (let col = 0; col < GRID_SIZE; col++) {
            const i = row * GRID_SIZE + col;
            const cell = cells[row][col];
            const cellHash = hashCoords(cell.col, cell.row, Math.floor(morphHashShift));

            if (cellHash > morphThreshold) {
              const newGeomIdx = Math.floor(Math.random() * geometries.length);
              const oldMapping = meshInstanceMap[i];

              if (newGeomIdx !== oldMapping.meshIdx) {
                // We need to handle geometry swapping
                // In this instanced approach, we'd need to rebuild the mapping
                // For simplicity, we'll just change the color visual cue
                color.setHex(0xFFFFFF);
                meshes[oldMapping.meshIdx].setColorAt(oldMapping.instanceIdx, color);
              }
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const fs = window.innerWidth < 768 ? 20 : 25;
      camera.left = -fs * aspect / 2;
      camera.right = fs * aspect / 2;
      camera.top = fs / 2;
      camera.bottom = -fs / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      material.dispose();
      geometries.forEach((g) => g.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
