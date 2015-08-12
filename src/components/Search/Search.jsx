import React from 'react';
import Styles from './Search.less';
import SearchService from '../../services/SearchService.js';
import Basic from '../../utils/Basic.js';
import ServiceProviders from '../../constants/ServiceProviders.js';
import KeywordService from '../../services/KeywordService.js';

export default React.createClass({
    getInitialState() {
        let state = {
            keyword: '',
            keywordList: [],
            showShadow: false
        };
        for (let i = 0; i < ServiceProviders.length; i++) {
            state[ServiceProviders[i].name] = []
        }
        return state;
    },

    componentDidMount() {
        React.findDOMNode(this.refs.searchResult).addEventListener('scroll', this.handleScroll);
    },

    componentWillUnmount() {
        React.findDOMNode(this.refs.searchResult).removeEventListener('scroll', this.handleScroll);
    },

    render() {
        // build result list
        let resultLength = 0;
        let ResultList = [];
        for (let i = 0; i < ServiceProviders.length; i++) {
            if (this.state[ServiceProviders[i].name].length > 0) {
                ResultList.push(<div className="provider-name">{ServiceProviders[i].title}</div>);
                ResultList.push(this.state[ServiceProviders[i].name].map((item) => {
                    resultLength++;
                    return (
                        <div className="result-item">
                            <a href={item.url} target="_blank">
                                <div className="image-box">
                                    <img className="frost" src={require('./frost.svg')}/>
                                    <div className="result-image" style={{backgroundImage: 'url(' + item.img + ')'}}></div>
                                </div>
                            </a>
                            <a href={item.url} target="_blank" className="result-title">{item.title}</a>
                            <p className="result-other">{item.other || ''}</p>
                        </div>
                    );
                }));
            }
        }

        // keyword list
        let KeywordList = [];
        if (this.state.keywordList.length > 0) {
            KeywordList = this.state.keywordList.map((item) => {
                return (
                    <li onClick={this.handleKeywordClick}>{item}</li>
                );
            });
        }

        return (
            <div className="Search">
                {resultLength !== 0 ? <div className="Search-title">
                    <div className="result-length">
                        共找到 <span className="num">{resultLength}</span> 个视频
                    </div>
                </div> : ''}
                <div className={"Search-shadow" + (this.state.showShadow ? ' active' : '')}></div>
                <div className="Search-result" ref="searchResult">
                    {resultLength !== 0 ? ResultList : <h1 className="blex">Blex</h1>}
                </div>
                <div className="Search-box">
                    <div className="input-box">
                        <input className="keyword-input" onChange={this.handleKeywordInputChange}/>
                        <button className="search-button" onClick={this.handleSearchButtonClick}><i className="fa fa-search"></i></button>
                    </div>
                    <ul className="keyword-list-box">
                        {KeywordList}
                    </ul>
                    <div className="info">
                        <a href="http://liuhao.im" target="_blank"><i class="fa fa-exclamation-circle"></i> Hao &copy; Blex v0.0.1</a>
                    </div>
                </div>
            </div>
        )
    },

    handleKeywordInputChange(e) {
        this.setState({keyword: e.target.value});
        KeywordService.tencent(e.target.value)
            .then((res) => {
                this.setState({keywordList: res});
            })
            .catch((err) => {
                this.setState({keywordList: []});
            });
    },

    handleKeywordClick(e) {
        this.setState({keyword: e.target.innerText}, () => {
            this.handleSearchButtonClick();
        });
    },

    handleSearchButtonClick() {
        for (let i = 0; i < ServiceProviders.length; i++) {
            let serviceProvider = ServiceProviders[i].name;
            SearchService[serviceProvider](this.state.keyword)
                .then((array) => {
                    let stateObj = {};
                    stateObj[serviceProvider] = array;
                    this.setState(stateObj);
                })
                .catch((err) => {
                    if (err === 'NO_RESULT') {
                        // pass TODO
                    }
                });
        }
    },

    handleScroll(e) {
        if (e.target.scrollTop >= 10) {
            this.setState({showShadow: true});
        } else {
            this.setState({showShadow: false});
        }
    }
});