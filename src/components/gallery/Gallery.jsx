import GalleryCardActivity from '@/components/card/GalleryCardActivity'
import activityData from '@/app/datas/activitys.json';

function App() {
    return (
        <div>
            <GalleryCardActivity activityData={activityData} />
        </div>
    );
}

export default App;

