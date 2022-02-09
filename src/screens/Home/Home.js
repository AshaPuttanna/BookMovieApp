import { Card, CardContent, Checkbox, FormControl, Grid, GridList, GridListTile, GridListTileBar, InputLabel,Typography } from "@material-ui/core";
import { display } from "@mui/system";
import React from "react";
import Header from "../../common/Header/Header";
import '../Home/Home.css'
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Input,Select,MenuItem } from "@material-ui/core";
import { DatePicker } from "@mui/lab";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button } from "@material-ui/core";
import { useState, useEffect } from 'react';



const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#42a5f5',
    },
 
  },

});






function Home(){
    const [genreName, setgenreName] = React.useState('');

    const handleChange = (event) => {
        setgenreName(event.target.value);
    };

 const [value, setValue] = React.useState(null);
      const [data, setData] = useState([]);
  
      const apiGet = () => {
          fetch("http://localhost:8085/api/v1/genres")
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              setData(json.genres);
            });
        };
  
        useEffect(() => {
            apiGet();
        }, []);


        const [imgData, setImg] = useState([]);
        const [relData,setRelData] = useState([]);
  
        const apiGetImg = () => {
            fetch("http://localhost:8085/api/v1/movies?page=1&limit=20")
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                setImg(json.movies);
              });
          };
          const apiGetMoviesReleased = () => {
            fetch("http://localhost:8085/api/v1/movies?page=1&limit=20&status=RELEASED")
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                setRelData(json.movies);
              });
          };
    
          useEffect(() => {
            apiGetImg();
            apiGetMoviesReleased();
          }, []);


    return(
<div className="headerContainer">
   <Header/>
   <div className="subHeading">
    Upcoming Movies
   </div>

   <div  >
       <GridList cellHeight={250}  style={{flexWrap:"nowrap" ,transform:"translateZ(0)"}} cols={6}  {...apiGetImg}   >
       {imgData.map((item) => 
           <GridListTile key={item.movies} >
            <img src={item.poster_url} />
               <GridListTileBar   title={item.title}>
               
               </GridListTileBar>
           </GridListTile>)}
       </GridList>
   </div>

   <div style={{ display: 'flex', margin:"16px"}} >
       <div >
       <GridList  cellHeight={350} cols={3} style={{cursor:'pointer'}}   {...apiGetMoviesReleased}  >
       {relData.map((item) => 
           <GridListTile key={item.movies}  >
              <img src={item.poster_url} />
               <GridListTileBar   title={item.title} subtitle={item.release_date}>
               
               </GridListTileBar>
           </GridListTile>)}
       </GridList>
       </div>
       <div  style={{ margin:"16px", justifyContent:"center" }}>
    <Card style={{ width:"350px" }} >
    <CardContent>
    <Typography style={{color:theme.palette.primary.main}}>
          FIND MOVIE BY:
        </Typography>
        <FormControl fullWidth >
            <InputLabel> Movie Name</InputLabel>
            <Input id="moviename" name="movie" placeholder='movie name'/>
        </FormControl>
        <FormControl  fullWidth  style={{margin:theme.margin}}>
            <InputLabel>Geners</InputLabel>
                                <Select {...apiGet}
                                id="demo-simple-select"
                                    value={genreName}
                                    onChange={handleChange}
                                    label="Genre" >{data.map((item) =>
                                    <MenuItem key={item.genres} value={genreName}><Checkbox checked={item.genres} />{item.genre}</MenuItem>)}
                                    
                                </Select>
        </FormControl>
        <FormControl fullWidth>
            <InputLabel>Artists</InputLabel>
                                <Select
                                    id="artist"
                                    label="Artists" >
                                    <MenuItem ><Checkbox/>Male</MenuItem>
                                    <MenuItem ><Checkbox/>Female</MenuItem>
                                    <MenuItem ><Checkbox/>Other</MenuItem>
                                </Select>
        </FormControl>
        <FormControl fullWidth spacing={5}>
            <InputLabel>Artists</InputLabel>
                                <Select
                                    id="artist"
                                    label="Artists" >
                                    <MenuItem >Male</MenuItem>
                                    <MenuItem >Female</MenuItem>
                                    <MenuItem >Other</MenuItem>
                                </Select>
        </FormControl>

        
     <FormControl fullWidth> 
    
        <LocalizationProvider dateAdapter={AdapterDateFns} >
        <DatePicker
        
        label='Release Date Start'
       style={{border:0}}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </FormControl>

   
     <FormControl fullWidth> 
    
        <LocalizationProvider dateAdapter={AdapterDateFns} >
        <DatePicker
       
       label='Release Date end'
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </FormControl>

    <span style={{ display: "flex", alignItems: "center", placeContent: "center ",paddingTop:"20px"  }}>
              
              <Button type='submit' variant="contained" color="primary" >  APPLY </Button>
            </span>
    </CardContent>


</Card>
       </div>
</div>
</div> 
    );

}
export default Home;