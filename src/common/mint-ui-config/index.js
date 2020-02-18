import {
  Swipe,
  SwipeItem,
  Toast,
  Button,
  Header,
  Tabbar,
  TabItem,
  Lazyload
} from "mint-ui";

export default vue => {
  vue.use(Swipe, SwipeItem, Toast, Button, Header, Tabbar, TabItem, Lazyload);
};
