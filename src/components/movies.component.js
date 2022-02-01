import React, { Component } from 'react';
import Table from './table.component';
import getMovies from '../service/get-movies.service';
import Rating from './rating.component';
import Pagination from './common/pagination.component';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        sortingProps: { key: 'id', order: 'asc' },
        activePage: 1,
        itemsPerPage: 8,
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

    onClickPage = (activePage) => {
        this.setState({ ...this.state, activePage });
    };

    handleSort = (sortingProps) => {
        this.setState({ ...this.state, sortingProps });
    };

    sortMovies = () => {
        const { sortingProps } = this.state;
        const movies = [...this.state.movies];

        const sortedMovies = _.orderBy(
            movies,
            [sortingProps.key],
            [sortingProps.order]
        );
        return sortedMovies;
    };

    paginateMovies = (movies) => {
        const { activePage, itemsPerPage } = this.state;
        const start = (activePage - 1) * itemsPerPage;
        const paginatedMovies = movies.slice(start, start + itemsPerPage);
        return paginatedMovies;
    };

    render() {
        const sortedMovies = this.sortMovies();
        const moviesToRender = this.paginateMovies(sortedMovies);
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
                <Table
                    items={moviesToRender}
                    columns={movieColumns}
                    sortingProps={this.state.sortingProps}
                    onSort={this.handleSort}
                />
                <Pagination
                    totalItems={this.state.movies.length}
                    itemsPerPage={this.state.itemsPerPage}
                    activePage={this.state.activePage}
                    onClickPage={this.onClickPage}
                />
            </>
        );
    }
}

export default Movies;
