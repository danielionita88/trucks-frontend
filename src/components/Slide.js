import React from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux'

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
}

class Slideshow extends React.Component {


    randomPosts = () => {
        const min = 1;
        const max = this.props.posts.length;
        let randomPosts = []
        while(randomPosts.length !== 2){
            let rand = min + Math.random() * (max - min);
            if (!randomPosts.includes(this.props.posts[Math.floor(rand)]))
            randomPosts.push(this.props.posts[Math.floor(rand)])
        }
        return randomPosts
    }

    renderSlides=()=>{
        return this.randomPosts().map(post =>  <div key={post.id} className="each-slide">
            <img id='slide-image' src={post.photos_urls[0]}/>
            <h3>{post.description}</h3>
            <h1>{post.title}</h1>
            </div>
        )
    }


    render() {

        if(this.props.posts.length < 1) {
            return <h1>Loading...</h1>
        }

        return (
            <div className="slide-container">
                <Slide {...properties}>
                   {this.renderSlides()}
                </Slide>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.allPosts
    }
}

export default connect(mapStateToProps)(Slideshow)

