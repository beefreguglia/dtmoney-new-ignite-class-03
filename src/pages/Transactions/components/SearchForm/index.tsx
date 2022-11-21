import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

/**
 * Porque 1 componente renderiza ?
 *
 * - Hooks changed (mudou algum estado, contexto, reducer)
 * = Props changed (mudou alguma propriedade)
 * - Parent rerendered (componente pai renderizou)
 *
 *  Qual o fluxo de renderização ?
 *
 * 1. O React recria o HTML da interface daquele componente
 * 2. Compara a versão criada com a versão anterior
 * 3. SE mudou algo ele reescreve o HTML na tela
 *
 * Utilizando o MEMO (Altera o fluxo de renderização)
 *
 * 0. Hooks changed?, Props changed? (deep comparison),
 * 0.1: Comparar a versão anterior dos hooks e props
 * 0.2: Se mudou algo, ele vai permitir a nova renderização
 *
 *
 * Para utilizar o memo devemos importar o memo e
 * exportar o componente assim
 * export const SearchForm = memo(SearchFormComponent)
 **/

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
    console.log(data)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
