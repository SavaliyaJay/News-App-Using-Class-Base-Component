import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        category: 'general'
    }
    static propTypes = {
        category: PropTypes.string,
    }
    constructor() {
        super();
        console.log("Constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
    }
    async updateNews() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5963b5fc9dff422eb125d443c94746d4&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({
            loading: true
        })
        let data = await fetch(url);
        this.props.setProgress(30);

        let parsedata = await data.json();
        this.props.setProgress(70);

        console.log(parsedata);
        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5963b5fc9dff422eb125d443c94746d4&page=1&pageSize=${this.props.pageSize}`;

        // this.setState({
        //     loading: true
        // })
        // let data = await fetch(url);
        // let parsedata = await data.json();
        // console.log(parsedata);
        // this.setState({
        //     articles: parsedata.articles,
        //     totalResults: parsedata.totalResults,
        //     loading: false
        // })
        this.updateNews();
        this.setState({ page: this.state.page + 1 })
    }
    handlePrevClick = async () => {
        // console.log("Prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5963b5fc9dff422eb125d443c94746d4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // })
        // let data = await fetch(url);
        // let parsedata = await data.json();
        // console.log(parsedata);

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedata.articles,
        //     loading: false
        // })


        await this.setState({
            page: this.state.page - 1
        })

        this.updateNews();
    }
    handleNextClick = async () => {
        // console.log("Next");

        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

        // console.log("Inside next");
        // console.log(this.state.page);
        //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5963b5fc9dff422eb125d443c94746d4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        //     this.setState({
        //         loading: true
        //     })
        //     let data = await fetch(url);
        //     let parsedata = await data.json();
        //     console.log(parsedata);

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedata.articles,
        //         loading: false
        //     })
        //     console.log("Inside next");
        //     console.log(this.state.page);
        // }
        await this.setState({
            page: this.state.page + 1
        })
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        console.log(this.state.page);
        // this.updateNews();
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5963b5fc9dff422eb125d443c94746d4&page=${this.state.page}&pageSize=${this.props.pageSize}`;


        let data = await fetch(url);
        let parsedata = await data.json();
        console.log(parsedata);
        this.setState({
            articles: this.state.articles.concat(parsedata.articles),
            totalResults: parsedata.totalResults,
        })
    };
    render() {

        return (
            <div>
                {/* <div className="container my-3"> */}
                <h2 className='text-center'>RealNews</h2>
                {this.state.loading && <Loader />}
                {/* !this.state.loading && */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loader />}
                >
                    <div className="container">
                        <div className="row">

                            {this.state.articles.map((element) => {
                                // console.log(element);
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} />
                                </div>
                            })}
                        </div></div>

                </InfiniteScroll>
                {/* <div className="container mt-2">
                        <div className="d-flex justify-content-between">
                            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                        </div>
                    </div> */}
                {/* </div> */}
            </div>
        )
    }
}

export default News
