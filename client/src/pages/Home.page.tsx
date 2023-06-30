import {withLayout} from "../modules/shared/Layout/Layout";
import {useAppSelector} from "../hooks/redux";

const HomePage = (): JSX.Element=> {
    return (
        <div>Алкаша страница</div>
    );
};

export default withLayout(HomePage);