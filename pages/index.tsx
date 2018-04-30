import React from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { Dispatch } from "react-redux";

import { initStore } from "../redux/store";
import { RootState } from "../state";
import { SampleState, loadWorker } from "../redux/modules/sample";

interface MappedProps {
  sample: SampleState;
}
interface MappedActions {
  loadWorker: typeof loadWorker;
}
type Props = MappedProps & MappedActions;

class Index extends React.Component<Props> {
  public static async getInitialProps({ store }) {
    await store.dispatch(loadWorker("Hello, World"));
  }

  public render() {
    const { isLoading, text } = this.props.sample;
    if (isLoading) {
      return <div>isLoading...</div>;
    }
    return <div>{text}</div>;
  }
}

function mapStateToProps(state: RootState): MappedProps {
  return {
    sample: state.sample,
  };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>): MappedActions {
  return bindActionCreators({ loadWorker }, dispatch);
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index);
