var audio = document.getElementById('audioPlayer'),
	record = document.getElementById('record'),
	stop = document.getElementById('stop'),
	play = document.getElementById('play'),
	audioConstraints = { audio: true, video: false};
	
stop.disabled = true;
play.disabled = true;
record.disabled = false;
	
var audioStream,
	recorder,
	audioLink = '';

record.onclick = function() 
{
    if (!audioStream)
        navigator.getUserMedia(audioConstraints, function(stream) 
        {
            if (window.IsChrome) stream = new window.MediaStream(stream.getAudioTracks());
            audioStream = stream;

            audio.src = URL.createObjectURL(audioStream);
            audio.play();
            audio.muted = true;

            // "audio" is a default type
            recorder = window.RecordRTC(stream, {
                type: 'audio'
            });
            recorder.startRecording();
        }, function() 
        { });
    else 
    {
        audio.src = URL.createObjectURL(audioStream);
        audio.play();
        if (recorder) recorder.startRecording();
    }

    window.isAudio = false;
    this.disabled = true;
    stop.disabled = false;
    play.disabled = true;
};

stop.onclick = function() 
{
    this.disabled = true;
    record.disabled = false;
    play.disabled = false;
    audio.src = '';

    if (recorder)
        recorder.stopRecording(function(url) 
        {
        	audioLink = url;
            document.getElementById('audio-url').innerHTML = '<a href="' + url + '" target="_blank">Download</a>';
        });
};

play.onclick = function()
{
	mywindow = window.open();
	mywindow.location.href = audioLink;
	mywindow.focus();
}
