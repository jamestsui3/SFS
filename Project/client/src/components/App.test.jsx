import React from 'react';
import {render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import axios from 'axios';
import 'regenerator-runtime';




describe('Initial Render', () => {
  test('should render App component' ,  () => {
    render(<App/>);
  
    expect(screen.getByText('Creditor')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Min Pay %')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('Add Debt')).toBeInTheDocument();
    expect(screen.getByText('Delete Debt')).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('Total Row Count: 0')).toBeInTheDocument();
    expect(screen.getByText('Check Row Count: 0')).toBeInTheDocument();
  })
  test('Adding debt and Deleting Debt', () => {
    render (<App/>)
    expect(screen.getByText('Total Row Count: 0')).toBeInTheDocument();
    var addDebt = screen.getByText('Add Debt')
    var total = screen.getByTestId('totalBalance').innerHTML
    expect(Number(total)).toBe(0)
    fireEvent.click(addDebt)
    var total = screen.getByTestId('totalBalance').innerHTML
    expect(screen.getByText('Total Row Count: 1')).toBeInTheDocument();
    expect(Number(total)).toBeGreaterThan(0)
    var deleteDebt = screen.getByText('Delete Debt')
    fireEvent.click(deleteDebt)
    var total = screen.getByTestId('totalBalance').innerHTML
    expect(Number(total)).toBe(0)
    expect(screen.getByText('Total Row Count: 0')).toBeInTheDocument();
  })
  test('Clicking on checkboxes', () => {
    render (<App/>)
    var addDebt = screen.getByText('Add Debt')
    fireEvent.click(addDebt)
    fireEvent.click(addDebt)
    fireEvent.click(addDebt)
    expect(screen.getByText('Total Row Count: 3')).toBeInTheDocument();
    const checkList = screen.getAllByTestId('check')
    expect(checkList.length).toBe(3)
    expect(screen.getByText('Check Row Count: 3')).toBeInTheDocument();
    const balanceList = screen.getAllByTestId('bPerEntry')
    var bal = 0
    for(var i = 0; i < balanceList.length; i++){
      balanceList[i] = Number(balanceList[i].innerHTML)
      bal += balanceList[i]
    }
    var total = Number(screen.getByTestId('totalBalance').innerHTML)
    expect(bal).toBe(total)
    fireEvent.click(checkList[0])
    var total = Number(screen.getByTestId('totalBalance').innerHTML)
    bal -= balanceList[0]
    expect(bal).toBe(total)
    expect(screen.getByText('Check Row Count: 2')).toBeInTheDocument();
    expect(screen.getByText('Total Row Count: 3')).toBeInTheDocument();
    fireEvent.click(checkList[0])
    var total = Number(screen.getByTestId('totalBalance').innerHTML)
    bal += balanceList[0]
    expect(bal).toBe(total)
    expect(screen.getByText('Check Row Count: 3')).toBeInTheDocument();
  })
})

describe('After Making API Call', () => {
  test('should get entries from API', async () => {
    render(<App/>)

    const entryList = await waitFor(() => screen.findAllByTestId('entry'))
    const balanceList = await waitFor(() => screen.findAllByTestId('bPerEntry'))
    var bal = 0
    for(var i = 0; i < balanceList.length; i++){
      balanceList[i] = Number(balanceList[i].innerHTML)
      bal += balanceList[i]
    }
    
    const total = await waitFor(() => screen.findByTestId('totalBalance'))
    expect(entryList).toHaveLength(10)
    expect(Number(total.innerHTML)).toBe(18129)
    expect(balanceList[0]).toBe(1363)
    expect(balanceList[1]).toBe(2763)
    expect(balanceList[2]).toBe(429)
    expect(balanceList[3]).toBe(1363)
    expect(balanceList[4]).toBe(2644)
    expect(balanceList[5]).toBe(5464)
    expect(balanceList[6]).toBe(2345)
    expect(balanceList[7]).toBe(836)
    expect(balanceList[8]).toBe(687)
    expect(balanceList[9]).toBe(235)
    expect(bal).toBe(18129)
    expect(screen.getByText('Total Row Count: 10')).toBeInTheDocument();
    expect(screen.getByText('Check Row Count: 10')).toBeInTheDocument();
  })
  
})





