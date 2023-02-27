import * as l from './CustomerDashboardElements';
import profileImage from '../../../Images/person2.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
const CustomerDashboardComponent = (props) => {
    const data1 = Array.from(props.Navs1.Navs);

    const { logout,user } = useAuth();

    const onclick = (link)=>{
        if(link === '/login'){
          logout();
        }
      }

    return ( 
        <l.Container>
            <l.Section>
                <l.Profile>
                    <l.Picture>
                        <l.Image src={profileImage}/>
                    </l.Picture>
                    <l.Name>
                        Jenny
                    </l.Name>
                </l.Profile>
                <l.Options>
                    <l.Content>
                        {
                            data1.map(Nav=>{
                                return(
                                    <l.ButtonSection>
                                        <Link to={Nav.link} onClick={()=>{onclick(Nav.link)}} className='btn'>
                                            <l.Button>
                                                <l.Icon>{Nav.icon}</l.Icon>
                                                <l.Text>{Nav.text}</l.Text>
                                            </l.Button>
                                        </Link>
                                    </l.ButtonSection>
                                )
                            })
                        }
                    </l.Content>
                </l.Options>
            </l.Section>
        </l.Container>
     );
}
 
export default CustomerDashboardComponent;