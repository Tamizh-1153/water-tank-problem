function generateChart() {
  const inputElement = document.getElementById("blockHeights")
  const inputValues = inputElement.value.split(",").map(Number)

  if (inputValues.every(Number.isFinite)) {
    renderChart(inputValues)
  } else {
    alert("Please enter valid numeric values separated by commas.")
  }
}

function renderChart(blockHeights) {
  const chartContainer = document.getElementById("chart-container")
  chartContainer.innerHTML = ""

  const svgNS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(svgNS, "svg")
  svg.setAttribute("width", "500")
  svg.setAttribute("height", "200")
  chartContainer.appendChild(svg)

  const blockWidth = 40
  const blockSpacing = 10

  for (let i = 0; i < blockHeights.length; i++) {
    const blockHeight = blockHeights[i]
    const rect = document.createElementNS(svgNS, "rect")
    rect.setAttribute("x", i * (blockWidth + blockSpacing))
    rect.setAttribute("y", 200 - blockHeight * 20)
    rect.setAttribute("width", blockWidth)
    rect.setAttribute("height", blockHeight * 20)
    rect.setAttribute("fill", "#f1c40f") 
    svg.appendChild(rect)
  }

  const waterLevel = calculateWaterLevel(blockHeights)
  for (let i = 0; i < waterLevel.length; i++) {
    const waterHeight = waterLevel[i]
    const rect = document.createElementNS(svgNS, "rect")
    rect.setAttribute("x", i * (blockWidth + blockSpacing))
    rect.setAttribute("y", 200 - (blockHeights[i] + waterHeight) * 20)
    rect.setAttribute("width", blockWidth)
    rect.setAttribute("height", waterHeight * 20)
    rect.setAttribute("fill", "rgba(52, 152, 219, 0.7)")
    svg.appendChild(rect)
  }

  const totalWaterUnits = waterLevel.reduce((acc, val) => acc + val, 0)
  const waterUnitsElement = document.getElementById("waterUnits")
  waterUnitsElement.textContent = `Water Units: ${totalWaterUnits}`
}

function calculateWaterLevel(heights) {
  const waterLevel = []
  let leftMax = 0
  let rightMax = 0

  for (let i = 0; i < heights.length; i++) {
    leftMax = Math.max(leftMax, heights[i])
    rightMax = Math.max(...heights.slice(i + 1))

    const currentWater = Math.max(0, Math.min(leftMax, rightMax) - heights[i])
    waterLevel.push(currentWater)
  }

  return waterLevel
}
