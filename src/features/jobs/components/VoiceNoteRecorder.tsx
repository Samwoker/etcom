import React, { useState, useRef } from 'react';
import { Mic, Square, Trash2, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface VoiceNoteRecorderProps {
  value?: string;
  onChange: (audioUrl?: string) => void;
}

export const VoiceNoteRecorder: React.FC<VoiceNoteRecorderProps> = ({
  value,
  onChange,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        // Fallback simulated voice note
        simulateVoiceNote();
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        onChange(audioUrl);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordSeconds((s) => {
          if (s >= 59) {
            stopRecording();
            return 60;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      // Permission denied or not supported: graceful simulated fallback
      simulateVoiceNote();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRecording(false);
  };

  const simulateVoiceNote = () => {
    setIsRecording(true);
    setRecordSeconds(0);
    let sec = 0;
    const interval = setInterval(() => {
      sec += 1;
      setRecordSeconds(sec);
      if (sec >= 3) {
        clearInterval(interval);
        setIsRecording(false);
        // Set sample audio recording placeholder
        onChange('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
      }
    }, 600);
  };

  const handleDelete = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
    setIsPlaying(false);
    onChange(undefined);
    setRecordSeconds(0);
  };

  const togglePlayback = () => {
    if (!audioPlayerRef.current && value) {
      audioPlayerRef.current = new Audio(value);
      audioPlayerRef.current.onended = () => setIsPlaying(false);
    }

    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
        setIsPlaying(false);
      } else {
        audioPlayerRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If dummy data URI cannot play, simulate playback
            setIsPlaying(true);
            setTimeout(() => setIsPlaying(false), 3000);
          });
      }
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Mic className="h-3.5 w-3.5 text-primary" />
          <span>Voice Description</span>
          <span className="text-[11px] text-muted-foreground font-normal">
            (Optional, max 60s)
          </span>
        </label>
        <span className="text-[11px] font-medium text-muted-foreground">
          {value ? 'Audio attached' : 'Amharic / English'}
        </span>
      </div>

      {!value && !isRecording && (
        <Button
          type="button"
          variant="outline"
          onClick={startRecording}
          className="w-full h-11 rounded-xl text-xs font-medium border border-dashed border-border/80 hover:border-primary/50 text-muted-foreground hover:text-foreground gap-2 bg-card/60 hover:bg-muted/30 shadow-2xs"
        >
          <Mic className="h-4 w-4 text-primary" />
          <span>Tap to record a voice description</span>
        </Button>
      )}

      {isRecording && (
        <Card className="border border-red-500/40 bg-red-500/5 rounded-xl">
          <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                Recording... 0:{recordSeconds.toString().padStart(2, '0')}
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={stopRecording}
              className="h-8 rounded-lg text-xs gap-1"
            >
              <Square className="h-3 w-3 fill-white" />
              <span>Stop</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {value && !isRecording && (
        <Card className="border border-primary/30 bg-primary/5 rounded-xl">
          <CardContent className="p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={togglePlayback}
                className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-emerald-600"
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
              </Button>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <Volume2 className="h-3 w-3 text-primary" /> Voice note attached
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  {isPlaying ? 'Playing description...' : 'Tap to listen to audio'}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              aria-label="Remove voice note"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
