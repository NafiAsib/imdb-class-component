import React, { Component } from 'react';
import Table from './table.component';
import getMovies from '../service/get-movies.service';
import Rating from './rating.component';

class Movies extends Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        const movies = getMovies();
        this.setState({ movies });
    }

    handleToggleFavourite = (id) => {
        const movies = [...this.state.movies];
        const movie = movies.find((movie) => movie.id === id);
        movie.isFavourite = !movie.isFavourite;
        this.setState({ ...this.state, movies });
    };

    render() {
        const movieColumns = [
            {
                label: 'Rank',
                key: 'id',
                isSortable: true,
                content: (movie, key) => <th scope="row">{movie[key]}</th>,
            },
            {
                label: 'Title',
                key: 'title',
                isSortable: true,
                content: (movie, key) => <td>{movie[key]}</td>,
            },
            {
                label: 'Poster',
                key: 'posterUrl',
                content: (movie, key) => (
                    <td>
                        <img
                            src={movie[key]}
                            alt="poster"
                            height={100}
                            width={'auto'}
                        />
                    </td>
                ),
            },
            {
                label: 'Favourite',
                key: 'isFavourite',
                content: (movie, key) => (
                    <Rating
                        isFavourite={movie[key]}
                        id={movie.id}
                        handleToggleFavourite={this.handleToggleFavourite}
                    />
                ),
            },
            {
                label: 'Action',
                key: 'action',
                content: (movie, key) => <td>{movie[key]}</td>,
            },
        ];

        return (
            <>
                <Table items={this.state.movies} columns={movieColumns} />
            </>
        );
    }
}

export default Movies;
