import { Button, GridList, GridListTile, Link, Typography, GridListTileBar } from "@material-ui/core";
import React from "react";
import LogoName from '../../assets/logo.svg'
import Login from "../Login/Login";
import '../Details/Details.css'
import YouTube from 'react-youtube';
import { ArrowBackIos } from "@material-ui/icons";
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';




function Details(props) {
  const { id } = props.match.params;
  const [value, setValue] = React.useState();

  const [details, setDetails] = React.useState(null);


  const getMovieDetails = () => {

    fetch("http://localhost:8085/api/v1/movies/" + id)
      .then((response) => response.json())
      .then((json) => {
        setDetails(json);
      });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);


  const history = useHistory();

  const routeChange = () => {
    let path = `newPath`;
    history.push('/bookshow/:id');
  }

  return (
    <div className="Details">
      <img className="logo" src={LogoName} alt="logo" />

      <span style={{ float: "right", marginLeft: "8px", }}>
        <Login />
      </span>

      <span style={{ float: "right" }}>
        <Button color="primary" variant="contained" onClick={routeChange} >Book Show</Button>
      </span>



      <div className="BackButton">
        <ArrowBackIos />
        <Link href="/">
         <Typography style={{ textTransform: "none"}} > Back to Home</Typography> </Link>
      </div>


      <div className="maincontainer" >
        <div className="columns">


          <div className="main">
            <Typography variant="headline" component="h2" >
              {details ? details.title : ''}
            </Typography>
            <Typography variant="subtitle2"   >Geners: <span style={{ fontWeight: "normal" }}>{details ? details.genres.toString() : ''}</span>
            </Typography>
            <Typography variant="subtitle2"   >Duration: <span style={{ fontWeight: "normal" }}>{details ? details.duration.toString() : ''}</span>
            </Typography>
            <Typography variant="subtitle2"   >Release Date: <span style={{ fontWeight: "normal" }}>{details ? new Date(details.release_date).toDateString() : ''}</span>
            </Typography>
            <Typography variant="subtitle2"   >Rating: <span style={{ fontWeight: "normal" }}>{details ? details.rating : ''}</span>
            </Typography>
            <Typography variant="subtitle2" style={{ marginTop: "16px" }}  >Plot:<a href="{details?details.wiki_url:''}">(Wiki Link)</a> <span style={{ fontWeight: "normal" }}>{details ? details.storyline : ''}</span>
            </Typography>
            <div>
              <Typography variant="subtitle2" style={{ marginTop: "16px" }}  >Trailer:
              </Typography>
              <YouTube >{details ? details.trailer_url : ''}</YouTube>
            </div>
          </div>

          <div className="sidebar-first">
            <img src={details ? details.poster_url : ''} />
          </div>

          <div className="sidebar-second">
            <Typography variant="subtitle2">Rate this Movie:</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />

            <Typography variant="subtitle2">Artists:</Typography>
            <GridList cols={2} >
              {details ? details.artists.map((item) =>
                <GridListTile  >
                  <img src={item ? item.profile_url : ''} />
                  <GridListTileBar title={item.first_name + ' ' + item.last_name}>
                </GridListTileBar>
                </GridListTile>
             
              ) : ''}
            </GridList>
          </div>
        </div>
      </div>
    </div>





  );

}
export default Details;