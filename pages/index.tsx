import React from "react";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { RootState } from "../redux/state";
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
    await store.dispatch(loadWorker({ greeting: "Hello, Next.js!" }));
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

function mapDispatchToProps(dispatch: Dispatch<AnyAction>): MappedActions {
  return bindActionCreators({ loadWorker }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
