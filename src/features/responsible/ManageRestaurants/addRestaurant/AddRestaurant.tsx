import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Stack } from '@mui/material';
import RestaurantForm from './RestaurantForm/RestaurantForm';
import MenuForm from './MenuForm/MenuForm';
import SectionForm from './SectionForm/SectionForm';
import ItemForm from './ItemForm/ItemForm';
import SupplementForm from './SupplementForm/supplementForm';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';

function RestaurantFormStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmitRestaurant = () => {
    handleNext();
  };

  const handleSubmitMenu = () => {
    handleNext();
  };

  const handleSubmitSection = () => {
    handleNext();
  };

  const handleSubmitItem = () => {
    handleNext();
  };

 const [restaurantId, setRestaurantID]=useState<number|string>('');
 const [menuId, setMenuID]=useState<number|string>('');
 const [sectionId, setSectionID]=useState<number|string>('');
  return (
    <Stack sx={{ paddingTop: 20, backgroundColor: 'white', width:'100%'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key="restaurant">
          <StepLabel>Step 1: Add new restaurant</StepLabel>
        </Step>
        <Step key="menu">
          <StepLabel>Step 2: Add menu</StepLabel>
        </Step>
        <Step key="section">
          <StepLabel>Step 3: Add sections</StepLabel>
        </Step>
        <Step key="item">
          <StepLabel>Step 4: Add Item</StepLabel>
        </Step>
        <Step key="supplemebt">
          <StepLabel>Step 5: Add supplement</StepLabel>
        </Step>
      </Stepper>
      <br/> <br/>
      <div  style={{   display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  margin: '0 auto'}}>
   
        {activeStep === 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center', // Vertically center items
          }}>
            <RestaurantForm getRestaurantId={(id)=>setRestaurantID(id)}/>
            <Button variant="contained" color="warning" onClick={handleSubmitRestaurant}>
              Next
              <ChevronRightIcon/>
            </Button>
          </div>
        )}
        {activeStep === 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center', // Vertically center items
          }} >
             <Button variant="contained" onClick={handleBack} color="warning">
              <ChevronLeftIcon/>
             Back
            </Button>
           <MenuForm restoId={restaurantId} getMenuId={(id)=>setMenuID(id)}/>
            <Button variant="contained" color="warning" onClick={handleSubmitMenu}>
            Next <ChevronRightIcon/>
            </Button>
           
          </div>
        )}
        {activeStep === 2 && (
          <div style={{
            display: 'flex',
            alignItems: 'center', // Vertically center items
          }}>
             <Button variant="contained" onClick={handleBack}color="warning">
             <ChevronLeftIcon/>
             Back
            </Button>
            <SectionForm menuId={menuId} getSectionId={(id)=>setSectionID(id)}/>
            <Button variant="contained" color="warning" onClick={handleSubmitSection}>
            Next <ChevronRightIcon/>
            </Button>
           
          </div>
        )}
         {activeStep === 3 && (
          <div style={{
            display: 'flex',
            alignItems: 'center', // Vertically center items
          }}>
           <Button variant="contained" onClick={handleBack}color="warning">
           <ChevronLeftIcon/>
           Back
            </Button>
            <ItemForm sectionId={sectionId}/>
            <Button variant="contained" color="warning"onClick={handleSubmitItem}>
            Next <ChevronRightIcon/>
            </Button>
            
          </div>
        )}
        {activeStep === 4 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
           <Button variant="contained" onClick={handleBack}color="warning">
           <ChevronLeftIcon/>
              Back
            </Button>
            <SupplementForm sectionId={sectionId}/>
            <Button variant="contained" color="warning" onClick={handleSubmitSection}>
            <CheckIcon/> Submit
            </Button>
            
          </div>
        )}
      </div>
    </Stack>
  );
}

export default RestaurantFormStepper;