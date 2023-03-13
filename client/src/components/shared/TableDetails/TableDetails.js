import { RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './TableDetailsElements'
const TableDetails = (props) => {
    console.log(props)
    return ( 
        <Container>
            <Header>
            Details Of All Tables
            </Header>
            <l.SubContainer>
                <l.Table>
                        <l.Tr>
                            <l.Th>Table No</l.Th>
                            <l.Th>Maximum No of Persons</l.Th>
                            <l.Th>Reservation Fee</l.Th>
                            <l.Th>Status</l.Th>
                        </l.Tr>
                        {
                            props.data2.map(table => {
                                return(
                                    <l.Tr key={table._id}>
                                        <l.Td>{table.TableNo}</l.Td>
                                        <l.Td>{table.NoOfPersons}</l.Td>
                                        <l.Td>{table.price}</l.Td>
                                        <l.Td>{table.Status}</l.Td>
                                    </l.Tr>
                                )
                                })
                        }  
                </l.Table>
            </l.SubContainer>
            <l.ButtonSection>
                <RegularButton>
                    Back
                </RegularButton>
            </l.ButtonSection>
        </Container>
     );
}
 
export default TableDetails;