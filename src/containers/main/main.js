import React, { PureComponent } from 'react';
import Header from 'containers/header/header';
import Content from 'containers/content/content';
import Footer from 'containers/footer/footer';
import initial from 'utils/initial';

class Main extends PureComponent {
    componentDidMount() {
        initial();
    }

    render() {
        return (<main>
            <Header />
            <Content />
            <Footer />
        </main>);
    }
}

export default Main;
