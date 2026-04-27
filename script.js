document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to Spotify!');

    const audioElement = document.getElementById('audio');
    const masterPlay = document.getElementById('masterPlay');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const myRange = document.getElementById('myRange');
    const songTitle = document.querySelector('.SongInfo .songNameText');
    const currentTimeEl = document.querySelector('.currentTime');
    const totalDurationEl = document.querySelector('.totalDuration');

    let songIndex = 0;
    const songs = [
        { songName: 'English Song 1', filePath: 'song.mp3' },
        { songName: 'English Song 2', filePath: '2.mp3' },
        { songName: 'English Song 3', filePath: '3.mp3' },
        { songName: 'English Song 4', filePath: '4.mp3' },
        { songName: 'English Song 5', filePath: '5.mp3' },
        { songName: 'English Song 6', filePath: '6.mp3' },
        { songName: 'English Song 7', filePath: '7.mp3' },
        { songName: 'English Song 8', filePath: '8.mp3' },
        { songName: 'English Song 9', filePath: '9.mp3' },
        { songName: 'English Song 10', filePath: '10.mp3' }
    ];

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const loadSong = (index) => {
        const song = songs[index];
        audioElement.src = song.filePath;
        songTitle.textContent = song.songName;
        myRange.value = 0;
        currentTimeEl.textContent = '0:00';
        totalDurationEl.textContent = '0:00';
    };

    const updatePlayButton = () => {
        if (audioElement.paused) {
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        } else {
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
    };

    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
        updatePlayButton();
    });

    prevBtn.addEventListener('click', () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songIndex);
        audioElement.play();
        updatePlayButton();
    });

    nextBtn.addEventListener('click', () => {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songIndex);
        audioElement.play();
        updatePlayButton();
    });

    audioElement.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(audioElement.duration);
    });

    audioElement.addEventListener('timeupdate', () => {
        if (!isNaN(audioElement.duration)) {
            const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            myRange.value = progress;
            currentTimeEl.textContent = formatTime(audioElement.currentTime);
        }
    });

    myRange.addEventListener('input', () => {
        if (!isNaN(audioElement.duration)) {
            audioElement.currentTime = (myRange.value / 100) * audioElement.duration;
        }
    });

    audioElement.addEventListener('ended', () => {
        nextBtn.click();
    });

    const songPlayBtns = document.querySelectorAll('.songPlayBtn');
    songPlayBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.songIndex);
            songIndex = index;
            loadSong(songIndex);
            audioElement.play();
            updatePlayButton();
            updateSongListIcons();
        });
    });

    const updateSongListIcons = () => {
        songPlayBtns.forEach((btn, idx) => {
            if (idx === songIndex && !audioElement.paused) {
                btn.classList.remove('fa-play');
                btn.classList.add('fa-pause');
            } else {
                btn.classList.remove('fa-pause');
                btn.classList.add('fa-play');
            }
        });
    };

    audioElement.addEventListener('play', updateSongListIcons);
    audioElement.addEventListener('pause', updateSongListIcons);

    loadSong(songIndex);
});