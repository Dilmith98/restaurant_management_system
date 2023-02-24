
import { useState } from "react";
import styled from "styled-components";
import {ChefImage }from "../../Images/InnerUi/chef.png";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import { InputLabel, MenuItem, NativeSelect, Select } from "@mui/material";
import { FormButton, RegularButton } from "../shared/SharedElements/Buttons";
import {img }from "../../Images/restoLogodark.png";
import { GrMapLocation } from 'react-icons/gr';
import {BsHourglassSplit} from 'react-icons/bs';
import{
    page,
    SubSection,
    Div1,
    Div2,
    FormSection,
    h1,
    ButtonSection,
    ButtonSection1,
    h3,
    h4,
    h5,

} 
from "./DeliverElement";
import { Container } from "../shared/SharedElements/SharedElements";
import { Header } from "../shared/SharedElements/SharedElements";
const DeliverComponent = () =>{

        return ( 
            <Container>
                <SubSection>
                <Header>
                        ORDER DETAILS
                    </Header>
                    <FormSection>
                        <Div1>
                        <FormControl  sx={{ m: 1, width: "35ch" }} variant="standard">
                            <TextField id="standard-basic" label="Customer Name" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <TextField id="standard-basic" label="Address" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                           </FormControl>

                           <h3> <GrMapLocation/></h3>
                           

                        </Div1>
                        <Div2>
                        <FormControl  sx={{ m: 1, width: "35ch" }} variant="standard">
                            <TextField id="standard-basic" label="Contact No" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <TextField id="standard-basic" label="Payment Method" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                            <TextField id="standard-basic" label="Total Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                         </FormControl>

                            <h4> <BsHourglassSplit/>Pending</h4>

                            <ButtonSection>
                                <FormButton>CONFIRM</FormButton>
                            </ButtonSection>
                        </Div2>
                    </FormSection>
                </SubSection>
                <ButtonSection1>
                    <RegularButton>Back</RegularButton>
                </ButtonSection1>

            </Container>
    );
};
export default DeliverComponent;