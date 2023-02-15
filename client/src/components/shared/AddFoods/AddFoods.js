import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { FormButton, RegularButton, UploadButton } from '../SharedElements/Buttons';
import { Container, Header } from '../SharedElements/SharedElements';
import * as l from './AddFoodsElements';
const AddFoodsComponent = () => {
       
    return ( 
        <Container>
            <l.SubSection>
            <Header>
                    Add Foods
                </Header>
                <l.FormSection>
                    <l.LeftSide>
                    <FormControl  sx={{ m: 1, width: "40ch" }} variant="standard">
                        <TextField id="standard-basic" label="Item" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginBottom:'10%'}} />
                        <>
                            <Select
                            defaultValue={30}
                            inputProps={{
                                name: "role",
                                id: "uncontrolled-native",
                            }}
                            sx={{
                                color: "white",
                                '.MuiSvgIcon-root ': {
                                fill: "white !important",
                                }
                            }}
                            
                            >
                            <MenuItem value={1}>Burgers</MenuItem>
                            <MenuItem value={2}>Pizza</MenuItem>
                            <MenuItem value={3}>Rice</MenuItem>
                            <MenuItem value={3}>Soup</MenuItem>
                            <MenuItem value={3}>Noodles</MenuItem>
                            <MenuItem value={3}>Beverages</MenuItem>
                            </Select>
                        </>
                        <TextField id="standard-basic" label="Price" variant="standard" InputLabelProps={{className:'textFeild_Label'}} sx={{marginTop:'10%'}} />
                        </FormControl>
                    </l.LeftSide>
                    <l.RightSide>
                        <l.ImageSection>
                            
                        </l.ImageSection>
                        <l.UploadButtonSection>
                            <UploadButton>Upload</UploadButton>
                        </l.UploadButtonSection>
                        <l.ButtonSection>
                            <FormButton>Add</FormButton>
                        </l.ButtonSection>
                    </l.RightSide>
                </l.FormSection>
            </l.SubSection>
            <l.ButtonSection1>
                <RegularButton>Back</RegularButton>
            </l.ButtonSection1>
        </Container>
     );
}
 
export default AddFoodsComponent;