import React, { useState } from 'react'
import {
  List,
  Button,
  Confirm,
  SemanticCOLORS,
  Form,
  Input,
  Container as ContainerSUI,
  Menu,
  Icon,
  Dropdown
} from 'semantic-ui-react'
import { Container, Texto } from './styles'

const App = () => {

  type TLista = {
    texto: string;
    feito: boolean;
  };

  const [lista, setLista] = useState<TLista[]>([])
  const [showConfirmItem, setShowConfirmItem] = useState<boolean>(false)
  const [showConfirmItens, setShowConfirmItens] = useState<boolean>(false)
  const [itemSelecionado, setItemSelecionado] = useState<number>(-1)
  const [formTexto, setFormTexto] = useState<string>('')

  type TItemInfo = {
    icone: 'square outline' | 'check square outline';
    cor: SemanticCOLORS;
  };

  const itemInfo = (feito: boolean): TItemInfo => {
    if (feito) {
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
    setShowConfirmItem(false)
    const novaLista = [...lista]
    novaLista.splice(itemSelecionado, 1)
    setLista(novaLista)
  }

  const adicionaItem = () => {
    const novaLista = [...lista]
    novaLista.push({
      texto: formTexto,
      feito: false
    })
    setLista(novaLista)
    setFormTexto('')
  }

  const marcarComo = (feito: boolean) => {
    const novaLista = [...lista]
    novaLista.map(item => {
      item.feito = feito
    })
    setLista(novaLista)
  }

  return (
    <>
      <Menu color='blue' inverted>
        <ContainerSUI>
          <Menu.Item header>
            Lista de Tarefas
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Dropdown
                trigger={
                  <>
                    <Icon name='check square outline' /> Marcar todos...
                  </>
                }
              >
                <Dropdown.Menu>
                  <Dropdown.Item icon='check square outline' text='...como feitos' onClick={() => marcarComo(true)} />
                  <Dropdown.Item icon='square outline' text='...como não feitos' onClick={() => marcarComo(false)} />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            <Menu.Item as='a' onClick={() => setShowConfirmItens(true)}>
              <Icon name='trash alternate outline' />
              Limpar Lista
            </Menu.Item>
          </Menu.Menu>
        </ContainerSUI>
      </Menu>
      <Container>
        <Form onSubmit={adicionaItem}>
          <Form.Group unstackable>
            <Form.Field
              control={Input}
              placeholder="Nova tarefa"
              width={14}
              value={formTexto}
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormTexto(e.target.value)
              }
            />
            <Form.Field
              control={Button}
              type='submit'
              color="blue"
              content="Adicionar"
              width={2}
            />
          </Form.Group>
        </Form>
        <List divided verticalAlign="middle">
          {lista.map((item, index) => (
            <List.Item key={index}>
              <List.Content floated="right">
                <Button
                  circular
                  icon="trash alternate outline"
                  color="red"
                  onClick={() => {
                    setItemSelecionado(index)
                    setShowConfirmItem(true)
                  }}
                />
              </List.Content>
              <List.Content floated="left">
                <Button
                  circular
                  icon={itemInfo(item.feito).icone}
                  color={itemInfo(item.feito).cor}
                  onClick={() => toggleCheck(index)}
                />
              </List.Content>
              <Texto feito={item.feito}>{item.texto}</Texto>
            </List.Item>
          ))}
        </List>
        <Confirm
          open={showConfirmItem}
          cancelButton="Cancelar"
          confirmButton="Ok"
          onCancel={() => setShowConfirmItem(false)}
          onConfirm={removeItem}
          content="Tem certeza que deseja remover esse item?"
        />
        <Confirm
          open={showConfirmItens}
          cancelButton="Cancelar"
          confirmButton="Ok"
          onCancel={() => setShowConfirmItens(false)}
          onConfirm={() => {
            setLista([])
            setShowConfirmItens(false)
          }}
          content="Tem certeza que deseja remover todos os itens?"
        />
      </Container>
    </>
  )
}

export default App
