import styled, { css } from 'styled-components'

export const SummaryContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;
`
interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${({ theme }) => theme['gray-600']};
  padding: 2rem;
  border-radius: 6px;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme['gray-300']};
  }
  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  //Condicional
  ${({ variant, theme }) =>
    variant === 'green' &&
    css`
      background: ${({ theme }) => theme['green-700']};
    `}
`
