import React from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux'

const properties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
}

const pictures=[
    'https://images.unsplash.com/photo-1540852360777-5f6fa7752aeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2892&q=80',
    'https://images.unsplash.com/photo-1541969487406-1f1adf3884ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2855&q=80',
    'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2781&q=80',
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2855&q=80'
]

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
        return pictures.map((p, index) =>  <div key={index} className="each-slide">
            <img id='slide-image' src={p}/>
            </div>
        )
    }


    render() {

        if(this.props.posts.length < 1) {
            return <h1>Loading...</h1>
        }

        return <Slide {...properties}>
                {this.renderSlides()}
            </Slide>
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.allPosts
    }
}

export default connect(mapStateToProps)(Slideshow)

