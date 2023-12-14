import { Provider } from 'react-redux';
import { store } from '@/store';
import { General } from "@/pages/general";

function App() {
  return (
    <Provider store={store}>
      <General/>
    </Provider>
  )
}

export default App
