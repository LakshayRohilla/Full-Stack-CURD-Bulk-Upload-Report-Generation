import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ name, component, to }) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      component={component}   
      to={to}                 
      sx={{ textDecoration: 'none', mb: 1 }} 
    >
      {name}
    </Button>
  );
};

export default AddButton;