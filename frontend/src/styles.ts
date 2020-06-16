import styled from 'styled-components'
import { Container as ContainerSUI, ItemContent } from 'semantic-ui-react'

export const Container = styled(ContainerSUI)`
  padding: 20px 0;
`
type TTextoProps = {
  feito: boolean
}

export const Texto = styled(ItemContent)<TTextoProps>`
  padding: 8px 0;
  text-decoration: ${p => p.feito ? 'line-through' : null};
`