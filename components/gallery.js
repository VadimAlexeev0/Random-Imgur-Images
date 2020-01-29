import InfiniteScroll from "react-infinite-scroll-component";
import Zoom from 'react-medium-image-zoom'

class Gallery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            imageElements: [],
        };
    }

    componentDidMount() {
        this.setState({
            imageElements: this.RandomArrayOfURLS(),
        })
    }

    //On component mount load the array of urls. Otherwise the state is stale on first load.
    //make the inital state a blank array

    randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    RandomArrayOfURLS = () => {
        let urls = []
        for (let i = 0; i < 30; i++) {
            let RandURL = "https://i.imgur.com/"+ this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + ".jpg";
            //console.log(i+" IMGUR "+RandURL)

            urls.push(RandURL)

            if(i === 29){
                return[
                    ...urls,
                ]
            }
        }
    }
    
    fetchMoreData = () => {
            this.setState({
            imageElements: this.state.imageElements.concat(this.RandomArrayOfURLS())
            });
    };

    render(){
        return(
            <>
                <InfiniteScroll
                    dataLength={this.state.imageElements.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    className="imageContainer"
                    >
                    {this.state.imageElements.map((item, key) => (
                        <Image src={item} key={key} num={key}/>
                    ))}
                </InfiniteScroll>
                
                <style jsx>{`
                .imageContainer{
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        align-items: center;
                        margin-top: 50px;
                    }
                    @media only screen and (max-width: 400px) {
                        div.galleryItem {
                            width: auto!important;
                            height: 100%!important;
                        }
                      }
                    div.galleryItem {
                        margin-bottom: 30px;
                        margin-right: 5px;
                        border: 1px solid #383838; 
                        background-color: #1C1C1C;
                        color: #fff;
                        float: left;
                        width: 20%;
                        box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
                        height: 100%;
                    }
                    
                    div.galleryItem:hover {
                        border: 1px solid #777;
                    }  

                    div.desc {
                        padding: 5px;
                        text-align: center;
                    }
                    
                    div.galleryItem img {
                        
                    }
                    div.galleryItem a {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;  
                    }
                `}</style>
            </>
        )
    }
}


class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dimensions: {}};
        this.onImgLoad = this.onImgLoad.bind(this);
    }
    onImgLoad({target:img}) {
        this.setState({
            dimensions:{
                height:img.naturalHeight,
                width:img.naturalWidth
            }
        });
    }
    render(){
        const {src,num} = this.props;
        const {width, height} = this.state.dimensions;

        //Default Image Not Available
        if(width == 161 && height == 81){
            return (null);
        }
        else if(width < 20 || height < 20){
            return (null);
        }
        else{
            return (
                <div className="galleryItem">
                    <a href={src} target="_blank">
                        <Zoom>
                            <img onLoad={this.onImgLoad} src={src} width="100%" height="auto"/>
                        </Zoom>
                    </a>
                    <div className="desc">{num}</div>
                </div>
            );
        }
        
    }
}


export default Gallery