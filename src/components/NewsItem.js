import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let {title, description,imgUrl,newsUrl} = this.props;
        return (
            <>
                <div className="card mt-3 my-3">
                    <img src={!imgUrl?"https://wallpapers.com/images/hd/simple-city-outline-0160co3ohzvkh0jj.jpg":imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer"  className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem