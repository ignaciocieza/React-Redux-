import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signIn, signOut } from "../../api/actions/index";

class GoogleAuth extends React.Component {

    componentDidMount() {

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '139033583816-ild1vrv9t0d2j3ml999ng4kmj4j9ctee.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            }).catch(e => {
                console.log(e);
                console.log("error");
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else {
            this.props.signOut();
        }
    };

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className='google icon' />
                    Salir
                </button>
            );
        }
        return (
            <button onClick={this.onSignIn} className="ui green google button">
                <i className='google icon' />
                Ingresar
            </button>
        );
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

let mapToSatateProp = (estado) => {
    return { isSignedIn: estado.authvideo.isSignedIn };
}

let mapDispatchToProps = dispatch => ({
    signIn: bindActionCreators(signIn, dispatch),
    signOut: bindActionCreators(signOut, dispatch)
});

export default connect(mapToSatateProp, mapDispatchToProps)(GoogleAuth);