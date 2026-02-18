<script setup lang="ts">
// No extra logic needed for static recreation
</script>

<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <div class="dashboard-title">
        <h2>Dashboard General</h2>
        <p>
          Administración y supervisión del flujo de residuos Institucionales.
        </p>
      </div>
      <div class="status-badge">
        <span class="badge">ESTADO: ÓPTIMO</span>
        <div class="update-time">Actualizado: hace 5 minutos</div>
      </div>
    </div>

    <div class="grid-row">
      <!-- Total Waste Card -->
      <div class="card">
        <div class="card-label">Residuos Totales Mensuales</div>
        <div class="card-value">1,245 <span>kg</span></div>
        <div class="trend up">
          12.4% <span class="trend-desc">respecto al mes anterior</span>
        </div>
      </div>

      <!-- Max Category Card -->
      <div class="card highlight-card">
        <div class="card-label">Categoría Mayor Volumen</div>
        <div class="card-value">Papel y Cartón</div>

        <div class="progress-container">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 65%"></div>
            <span class="percentage-badge">65%</span>
          </div>
          <p class="progress-info">
            Equivalente a 809 kg de material recolectado.
          </p>
        </div>

        <!-- Big faint icon in background -->
        <svg
          style="position: absolute; right: -20px; bottom: -20px; opacity: 0.1"
          width="140"
          height="140"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>

      <!-- Active Alerts Card -->
      <div class="card">
        <div class="card-header" style="margin-bottom: 12px">
          <div class="card-label" style="margin: 0">Alertas Activas</div>
          <span
            style="
              background: #fee2e2;
              color: #b91c1c;
              font-size: 10px;
              font-weight: 800;
              padding: 2px 6px;
              border-radius: 10px;
            "
            >3</span
          >
        </div>
        <div class="alerts-list">
          <div class="alert-item danger">
            <div class="alert-icon danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
                />
                <line x1="12" x2="12" y1="9" y2="13" />
                <line x1="12" x2="12.01" y1="17" y2="17" />
              </svg>
            </div>
            <div class="alert-content">
              <h5>Contenedor Lleno</h5>
              <p>Punto Limpio - Bloque A (Papel)</p>
            </div>
          </div>
          <div class="alert-item warning">
            <div class="alert-icon warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div class="alert-content">
              <h5>Retirada Pendiente</h5>
              <p>Patio Central - Programado 14:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-row">
      <!-- Categories Donut Chart -->
      <div class="card">
        <div class="card-header">
          <h3>Distribución por Categoría</h3>
          <select
            style="
              font-size: 11px;
              padding: 4px 8px;
              border-radius: 6px;
              border: 1px solid #e2e8f0;
              color: #64748b;
            "
          >
            <option>Últimos 30 días</option>
          </select>
        </div>

        <div class="chart-container">
          <div class="donut-placeholder">
            <!-- Simulated donut chart with CSS gradients or SVG -->
            <svg width="180" height="180" viewBox="0 0 36 36" class="donut">
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#f1f5f9"
                stroke-width="3"
              ></circle>
              <!-- Papel 45% -->
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#1e293b"
                stroke-width="3"
                stroke-dasharray="45 55"
                stroke-dashoffset="25"
              ></circle>
              <!-- Plastico 25% -->
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#3b82f6"
                stroke-width="3"
                stroke-dasharray="25 75"
                stroke-dashoffset="80"
              ></circle>
              <!-- Organico 20% -->
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#10b981"
                stroke-width="3"
                stroke-dasharray="20 80"
                stroke-dashoffset="55"
              ></circle>
              <!-- Vidrio 10% -->
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#f59e0b"
                stroke-width="3"
                stroke-dasharray="10 90"
                stroke-dashoffset="35"
              ></circle>
            </svg>
            <div class="donut-center" style="position: absolute">
              <span class="big-num">100%</span>
              <span class="total-label">Total</span>
            </div>
          </div>

          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-label">
                <span class="dot" style="background: #1e293b"></span>
                Papel/Cartón
              </div>
              <div class="legend-value">45%</div>
            </div>
            <div class="legend-item">
              <div class="legend-label">
                <span class="dot" style="background: #3b82f6"></span> Plástico
              </div>
              <div class="legend-value">25%</div>
            </div>
            <div class="legend-item">
              <div class="legend-label">
                <span class="dot" style="background: #10b981"></span> Orgánico
              </div>
              <div class="legend-value">20%</div>
            </div>
            <div class="legend-item">
              <div class="legend-label">
                <span class="dot" style="background: #f59e0b"></span> Vidrio
              </div>
              <div class="legend-value">10%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent History Table -->
      <div class="card">
        <div class="card-header">
          <h3>Historial Reciente</h3>
          <a href="#" class="view-all">Ver Todo</a>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Ubicación</th>
              <th>Categoría</th>
              <th style="text-align: right">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>14 May, 09:20</td>
              <td class="location-cell">Bloque A</td>
              <td><span class="category-badge papel">PAPEL</span></td>
              <td class="amount-cell">24 kg</td>
            </tr>
            <tr>
              <td>14 May, 08:45</td>
              <td class="location-cell">Patio Central</td>
              <td><span class="category-badge organico">ORGÁNICO</span></td>
              <td class="amount-cell">15 kg</td>
            </tr>
            <tr>
              <td>13 May, 16:15</td>
              <td class="location-cell">Laboratorio</td>
              <td><span class="category-badge plastico">PLÁSTICO</span></td>
              <td class="amount-cell">8 kg</td>
            </tr>
            <tr>
              <td>13 May, 11:30</td>
              <td class="location-cell">Cafetería</td>
              <td><span class="category-badge vidrio">VIDRIO</span></td>
              <td class="amount-cell">32 kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
