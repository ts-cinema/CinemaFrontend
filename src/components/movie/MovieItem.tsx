import { Fragment } from "react";
import { useDispatch } from "react-redux";
import classes from "./MovieItem.module.css";
import Swal from "sweetalert2";
import interceptionAxios from "../../api/InterceptionAxios";
import { Rating } from "@material-ui/lab";
import {cookieService} from "../../CookieService"
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { access } from "fs";
// import { updateContentRating } from "../../store/movie-actions";
// import "./SwalStyle.css";

const MovieItem = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateRating = async (rating: any) => {

    const accessToken = cookieService.getCookie()?.token;
    if (accessToken == null) {
      const swalText = `<div style='color:whitesmoke'>You don't have permissions to perform this action!</div>`;
        Swal.fire({
            title: `<div style='color:whitesmoke'>An error occured!</div>`,
            html: swalText,
            icon: "error",
            backdrop: true,
            showConfirmButton: true,
            confirmButtonColor: "#eb0028",
            focusConfirm: false,
            background: "#2C2C2C",
        });
    }
    else {
        const decoded: any = jwt_decode(accessToken);
        const newRating = {
          movie_id: props.movie.id,
          value: rating,
          user_id: decoded.user_identifier
        };
        const config = {
          headers: { "Authorization": `Bearer ${accessToken}` }
        };

        await interceptionAxios.post(`api/v1/cinema/ratings`, newRating, config).then((res: any) => {
          const swalText = `<div style='color:whitesmoke'>You have successfully rated "<b>${props.movie.title}</b>" with <b>${rating} star(s)</b>!</div>`;
          Swal.fire({
              title: `<div style='color:whitesmoke'>Thank you for your rating!</div>`,
              html: swalText,
              icon: "success",
              backdrop: true,
              showConfirmButton: true,
              confirmButtonColor: "#eb0028",
              focusConfirm: false,
              background: "#2C2C2C",
          });
      }).catch((error: any) => {
        if (error?.response?.code !== 201) {
          const swalText = `<div style='color:whitesmoke'>You are unable to perform this action!</div>`;
          Swal.fire({
              title: `<div style='color:whitesmoke'>An error occured!</div>`,
              html: swalText,
              icon: "error",
              backdrop: true,
              showConfirmButton: true,
              confirmButtonColor: "#eb0028",
              focusConfirm: false,
              background: "#2C2C2C",
          });
        }
      });
    }

    return () => {
        //
    };
  }
  const onStarClickHandler = (event: any) => {
    let value = event.target.value;
    if (value < 0 || value > 5 || value == null || value === undefined) return;
    updateRating(value);

    /*dispatch(updateContentRating(props.movie.id, value)).then(() => {
      const swalText = `<div style='color:whitesmoke'>You have successfully rated "<b>${props.movie.title}</b>" with <b>${value} star(s)</b>!</div>`;
      Swal.fire({
        title: `<div style='color:whitesmoke'>Thank you for your rating!</div>`,
        html: swalText,
        icon: "success",
        backdrop: true,
        showConfirmButton: true,
        confirmButtonColor: "#eb0028",
        focusConfirm: false,
        background: "#2C2C2C",
      });
    }); */
  };

  return (
    <Fragment>
      <div className={classes.movie}>
        <div>
          <span className={`${classes.spanImage} ${classes.spanContent}`}>
            <img
              className={classes.coverPhoto}
              src={props.movie.cover_url}
              alt="Movie Cover"
            />
          </span>
          <div className={classes.controls}>
            <Rating
              name={`movie-id-${props.movie.id}`}
              value={props.movie.rating}
              size="large"
              precision={0.5}
              onChange={onStarClickHandler}
              style={{ color: "#eb0028" }}
            />
            <div className={classes.numberRating}>
              <b>{props.movie.rating.toFixed(1)}</b> /5
            </div>
          </div>
        </div>
        <span className={`${classes.spanConten} ${classes.scrollableInfo}`}>
          <h3>{props.movie.title}</h3>
          <p>{props.movie.description}</p>
          <p>
            <b>Release date:</b>{" "}
            {props.movie.release_date.substring(0,10)}
          </p>
          <p>
            <b>Genre:</b>{" "}
            {props.movie.genre}
          </p>
          <button 
            className={classes.reserveBtn}
            onClick={() => {
              navigate('/reservation', { state: { movieId: props.movie.id, movieName: props.movie.title } });
            }}
          >Reserve tickets</button>
        </span>
      </div>
    </Fragment>
  );
};

export default MovieItem;