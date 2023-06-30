

const timeFormat = (countSeconds: number) => {
    const hours = Math.floor(countSeconds/3600);
    const minutes = Math.floor(countSeconds / 60) - (hours * 60);
    const seconds = Math.floor(countSeconds%60);
    let formatted;

    if(hours == 0) {
        formatted = [
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    } else {
        formatted = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    }

    return formatted;
}

export default timeFormat