import React from "react";
import styles from "./MoviePage.module.css";
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';
import imdb from './imdb.png';
import background from './background.jpg'
import Nullimage from './no-image.webp';
import { findMovie, getRecommended, getCast } from '../../api';

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

function checkImageExists(image) {
    if (image != null) {
        return ("https://image.tmdb.org/t/p/w1280" + image);
    }
    return Nullimage;
}

function checkBackdropExists(image) {
    
    if (image != null) {
        return ("https://image.tmdb.org/t/p/w1280" + image);
    }
    return background;
}


class MoviePage extends React.Component {

    state = {
        movie: {},
        recomended: [],
        cast: [],
    }

    async componentDidMount() {
        setTimeout(async () => { 
            const movie = await findMovie(this.props.id);
            const recommended = await getRecommended(this.props.id);
            const cast = await getCast(this.props.id);
            document.title = `${movie.title ? movie.title : "Invalid Movie"} | Click-Show`;
            window.onfocus = function() {
                document.title = `${movie.title ? movie.title : "Invalid Movie"} | Click-Show`;
            };
            window.onblur = function() {
                setTimeout(() => { 
                    document.title = `👋 You are missing out on great movies`;
                }, 30000)
            };
            this.setState({ movie, recommended, cast});
        }, 0);
    }

