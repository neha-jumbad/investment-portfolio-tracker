// DOM Elements

const addInvestmentBtn = document.getElementById('add-investment-btn');
const investmentForm = document.getElementById('investment-form');
const investmentList = document.getElementById('investment-list');
const totalValueElem = document.getElementById('total-value');
const addInvestment = document.getElementById('add-investment');

// Global investment array


let investments = [];

// Show/Hide form

addInvestmentBtn.addEventListener('click', () => {
  investmentForm.style.display = investmentForm.style.display === 'block' ? 'none' : 'block';
});



// Add investment to list


addInvestment.addEventListener('click', () => {
  const assetName = document.getElementById('asset-name').value;
  const amountInvested = parseFloat(document.getElementById('amount-invested').value);
  const currentValue = parseFloat(document.getElementById('current-value').value);
  
  if (assetName && !isNaN(amountInvested) && !isNaN(currentValue)) {
    const investment = {
      assetName,
      amountInvested,
      currentValue,
      percentChange: ((currentValue - amountInvested) / amountInvested * 100).toFixed(2)
    };
    
    investments.push(investment);
    updateInvestmentList();
    updateTotalValue();
  }
});


// Update investment list

function updateInvestmentList() {
  investmentList.innerHTML = '';               // Clear existing list
  investments.forEach((investment, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${investment.assetName}</td>
      <td>$${investment.amountInvested}</td>
      <td>$${investment.currentValue}</td>
      <td>${investment.percentChange}%</td>
      <td>
        <button onclick="removeInvestment(${index})">Remove</button>
      </td>
    `;
    investmentList.appendChild(row);
  });
}


// Update total portfolio value

function updateTotalValue() {
  const totalValue = investments.reduce((sum, investment) => sum + investment.currentValue, 0);
  totalValueElem.textContent = totalValue.toFixed(2);
}

// Remove investment

function removeInvestment(index) {
  investments.splice(index, 1);
  updateInvestmentList();
  updateTotalValue();
}