import React, { useState } from 'react'
import { List, Button, Confirm, SemanticCOLORS } from 'semantic-ui-react'
import { Container, Texto } from './styles'

const App = () => {

  type TLista = {
    texto: string,
    feito: boolean
  }

  const mockData: TLista[] = [
    {
      texto: 'Fazer compras',
      feito: false
    },
    {
      texto: 'Lavar louca',
      feito: true
    },
    {
      texto: 'Fazer compras',
      feito: false
    },
    {
      texto: 'Fazer compras',
      feito: false
    },
    {
      texto: 'Fazer compras',
      feito: false
    },
  ]

  const [lista, setLista] = useState<TLista[]>(mockData)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [itemSelecionado, setItemSelecionado] = useState<number>(-1)

  type TItemInfo = {
    icone: 'square outline' | 'check square outline'
    cor: SemanticCOLORS
  }

  const itemInfo = (feito: boolean): TItemInfo => {
    if(feito) {
      return { icone: 'check square outline', cor: 'green' }
    }
    return { icone: 'square outline', cor: 'grey' }
  }

  const toggleCheck = (index: number) => {
    const novaLista = [...lista]
    novaLista[index].feito = !novaLista[index].feito
    setLista(novaLista)
  }

  const removeItem = () => {
    setShowConfirm(false)
    const novaLista = [...lista]
    novaLista.splice(itemSelecionado, 1)
    setLista(novaLista)
  }

  return (
    <Container>
      <List divided verticalAlign='middle'>
        {lista.map((item, index) => (
          <List.Item key={index}>
            <List.Content floated='right'>
              <Button
                circular
                icon='trash'
                color='red'
                onClick={() => {
                  setItemSelecionado(index)
                  setShowConfirm(true)
                }}
              />
            </List.Content>
            <List.Content floated='left'>
              <Button
                circular
                icon={itemInfo(item.feito).icone}
                color={itemInfo(item.feito).cor}
                onClick={() => toggleCheck(index)}
              />
            </List.Content>
            <Texto feito={item.feito}>
              {item.texto}
            </Texto>
          </List.Item>
        ))}
      </List>
      <Confirm
        open={showConfirm}
        cancelButton='Cancelar'
        confirmButton="Ok"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => removeItem()}
        content='Tem certeza que deseja remover esse item?'
      />
    </Container>
  )
}

export default App
