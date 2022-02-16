import { Card, CardContent, Checkbox, FormControl, Grid, GridList, GridListTile, GridListTileBar, InputLabel, Typography } from "@material-ui/core";
import React from "react";
import Header from "../../common/Header/Header";
import '../Home/Home.css'
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Input, Select, MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';



const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#42a5f5',
    },

  },
  spacing: 4,


});








function Home() {


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
  const [relData, setRelData] = useState([]);

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

  const history = useHistory();
  const handleClick = (id) => history.push('/movie/' + id);




  return (
    <div className="headerContainer">
      <Header />
      <div className="subHeading">
        Upcoming Movies
      </div>

      <div  >
        <GridList cellHeight={250} style={{ flexWrap: "nowrap", transform: "translateZ(0)", cursor: "pointer" }} cols={6}  {...apiGetImg}    >
          {imgData.map((item) =>
            <GridListTile key={item.movies} >
              <img src={item.poster_url} />
              <GridListTileBar title={item.title}>

              </GridListTileBar>
            </GridListTile>)}
        </GridList>
      </div>

      <div style={{ display: 'flex', margin: "16px" }} >
        <div >
          <GridList cellHeight={350} cols={3} style={{ cursor: 'pointer' }}   {...apiGetMoviesReleased}   >
            {relData.map((item) =>
              <GridListTile key={item.movies} style={{ width: "250px", padding: "16px" }}>
                <img src={item.poster_url} onClick={() => handleClick(item.id)} />
                <GridListTileBar title={item.title} subtitle={"Release Date " + new Date(item.release_date).toDateString()}>

                </GridListTileBar>
              </GridListTile>)}
          </GridList>
        </div>


        <div style={{ margin: "16px", justifyContent: "center" }} >

          <Card>

            <CardContent >

              <Typography style={{ color: theme.palette.primary.main }}>
                FIND MOVIE BY:
              </Typography>

              <FormControl fullWidth style={{ margin: theme.spacing(2) }}  >
                <InputLabel> Movie Name</InputLabel>
                <Input id="moviename" name="movie" placeholder='movie name' />
              </FormControl>

              <FormControl fullWidth style={{ margin: theme.spacing(2) }} >
                <InputLabel>Geners</InputLabel>
                <Select {...apiGet}
                  id="demo-simple-select"
                  value={genreName}
                  onChange={handleChange}
                  label="Genre" >{data.map((item) =>
                    <MenuItem key={item.genres} value={genreName}><Checkbox checked={item.genres} />{item.genre}</MenuItem>)}

                </Select>
              </FormControl>
              <FormControl fullWidth style={{ margin: theme.spacing(2) }}>
                <InputLabel>Artists</InputLabel>
                <Select
                  id="artist"
                  label="Artists" >
                  <MenuItem ><Checkbox />Male</MenuItem>
                  <MenuItem ><Checkbox />Female</MenuItem>
                  <MenuItem ><Checkbox />Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ margin: theme.spacing(2) }} >
                <InputLabel>Artists</InputLabel>
                <Select
                  id="artist"
                  label="Artists" >
                  <MenuItem>Male</MenuItem>
                  <MenuItem >Female</MenuItem>
                  <MenuItem >Other</MenuItem>
                </Select>
              </FormControl>




              <FormControl fullWidth variant="standard" style={{ margin: theme.spacing(2) }}>
                <InputLabel htmlFor="standard-adornment-release" shrink={true}>Release Date Start</InputLabel>
                <Input type="date" id="standard-adornment-release" label="set date" />
                </FormControl>

              <FormControl fullWidth variant="standard" style={{ margin: theme.spacing(2) }}>
                <InputLabel htmlFor="standard-adornment-release" shrink={true}>Release Date End</InputLabel>
                <Input type="date" id="standard-adornment-release" label="set date" />
                </FormControl>
              



              <span style={{ display: "flex", alignItems: "center", placeContent: "center ", paddingTop: "20px" }}>
              <Button fullWidth type='submit' variant="contained" color="primary"   >  APPLY </Button>
              </span>
              
            </CardContent>


          </Card>
        </div>
      </div>
    </div>
  );

}
export default Home;