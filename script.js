/**
 * Advanced Calculator Application
 * Features: Basic arithmetic, memory functions, scientific operations
 */

// ==================== DOM ELEMENTS & GLOBAL VARIABLES ====================

/** @type {HTMLInputElement} Main calculator display input field */
const display = document.getElementById("display");

/** @type {HTMLDivElement} Memory status display element */
const memoryDisplay = document.getElementById("memoryDisplay");

/** @type {number} Stores the current memory value for M+, M-, MR operations */
let memory = 0;

// ==================== BASIC CALCULATOR FUNCTIONS ====================

/**
 * Appends a value (number or operator) to the calculator display
 * @param {string|number} value - The value to append to the display
 * @example appendValue('5') // Adds '5' to display
 * @example appendValue('+') // Adds '+' operator to display
 */
function appendValue(value) {
  display.value += value;
}

/**
 * Clears the calculator display completely
 * Resets display to empty string
 */
function clearDisplay() {
  display.value = "";
}

/**
 * Deletes the last character from the display
 * Uses slice() to remove the rightmost character
 */
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

/**
 * Evaluates the mathematical expression in the display
 * Uses Math.js library for safe expression evaluation
 * Handles errors and edge cases (Infinity, NaN)
 * @returns {void} Updates display with result or "Error"
 */
function calculate() {
  try {
    // Use Math.js evaluate() for safe mathematical expression parsing
    const result = math.evaluate(display.value);

    // Validate result - check for mathematical errors
    if (result === Infinity || result === -Infinity || isNaN(result)) {
      display.value = "Error";
    } else {
      display.value = result;
    }
  } catch {
    // Catch any parsing or evaluation errors
    display.value = "Error";
  }
}

// ==================== ADVANCED MATHEMATICAL FUNCTIONS ====================

/**
 * Calculates the square root of the current display value
 * Handles negative numbers by showing error
 * @returns {void} Updates display with square root or "Error"
 * @example squareRoot() // √25 = 5
 */
function squareRoot() {
  try {
    // Convert display value to number, default to 0 if invalid
    const current = parseFloat(display.value) || 0;

    // Check for negative numbers (invalid for real square roots)
    if (current < 0) {
      display.value = "Error";
    } else {
      display.value = Math.sqrt(current);
    }
  } catch {
    display.value = "Error";
  }
}

/**
 * Converts the current display value to percentage (divides by 100)
 * @returns {void} Updates display with percentage value
 * @example percentage() // 50 becomes 0.5 (50%)
 */
function percentage() {
  try {
    // Parse current value, fallback to 0 if invalid
    const current = parseFloat(display.value) || 0;
    display.value = current / 100;
  } catch {
    display.value = "Error";
  }
}

/**
 * Calculates the square (power of 2) of the current display value
 * @returns {void} Updates display with squared value
 * @example power() // 5² = 25
 */
function power() {
  try {
    // Get current number from display
    const current = parseFloat(display.value) || 0;
    display.value = Math.pow(current, 2);
  } catch {
    display.value = "Error";
  }
}

// ==================== MEMORY FUNCTIONS ====================

/**
 * Memory Clear (MC) - Resets memory to zero
 * @returns {void} Clears memory and updates display
 */
function memoryClear() {
  memory = 0;
  updateMemoryDisplay();
}

/**
 * Memory Recall (MR) - Displays the stored memory value
 * @returns {void} Shows memory value in calculator display
 */
function memoryRecall() {
  display.value = memory;
}

/**
 * Memory Add (M+) - Adds current display value to memory
 * @returns {void} Adds current number to memory storage
 * @example memoryAdd() // If display shows 5 and memory is 10, memory becomes 15
 */
function memoryAdd() {
  try {
    // Parse current display value, use 0 if invalid
    const current = parseFloat(display.value) || 0;
    memory += current;
    updateMemoryDisplay();
  } catch {
    // Silently handle errors - don't modify memory if parsing fails
  }
}

/**
 * Memory Subtract (M-) - Subtracts current display value from memory
 * @returns {void} Subtracts current number from memory storage
 * @example memorySubtract() // If display shows 3 and memory is 10, memory becomes 7
 */
function memorySubtract() {
  try {
    // Parse current display value, use 0 if invalid
    const current = parseFloat(display.value) || 0;
    memory -= current;
    updateMemoryDisplay();
  } catch {
    // Silently handle errors - don't modify memory if parsing fails
  }
}

/**
 * Updates the memory display indicator
 * Shows current memory value and adjusts opacity based on whether memory is active
 * @returns {void} Updates memory display UI element
 */
function updateMemoryDisplay() {
  memoryDisplay.textContent = `M: ${memory}`;
  // Dim display when memory is 0, brighten when memory has value
  memoryDisplay.style.opacity = memory !== 0 ? "1" : "0.5";
}

// ==================== KEYBOARD EVENT HANDLING ====================

/**
 * Keyboard event listener for calculator input
 * Supports all calculator functions via keyboard shortcuts
 *
 * Supported Keys:
 * - Numbers (0-9): Input digits
 * - Operators (+, -, *, /): Mathematical operations
 * - Parentheses ( ): Grouping operations
 * - Decimal (.): Decimal point
 * - Enter: Calculate result
 * - Backspace: Delete last character
 * - Escape: Clear display
 * - S: Square root
 * - %: Percentage
 */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Handle numeric input and basic operators
  if (/[0-9+\-*/().]/.test(key)) {
    // Append valid calculator characters to display
    appendValue(key);
  }
  // Calculate result on Enter key
  else if (key === "Enter") {
    e.preventDefault(); // Prevent form submission
    calculate();
  }
  // Delete last character on Backspace
  else if (key === "Backspace") {
    deleteLast();
  }
  // Clear display on Escape key
  else if (key === "Escape") {
    clearDisplay();
  }
  // Square root on 'S' key
  else if (key === "s" || key === "S") {
    squareRoot();
  }
  // Percentage on '%' key
  else if (key === "%") {
    percentage();
  }
});

// ==================== INITIALIZATION ====================

/**
 * Initialize the calculator application
 * Set up memory display on page load
 */
updateMemoryDisplay();

// ==================== END OF CALCULATOR APPLICATION ====================
