import './loader.scss';
import loader from '../../assets/loader.json'
import { useLottie } from "lottie-react";

function Loader() {
    const options = {
        animationData: loader,
        loop: true,
        autoplay: true
    };
    const { View } = useLottie(options);

    return (
        <div className="loader">
            {View}
        </div>

    );
}

export default Loader;
