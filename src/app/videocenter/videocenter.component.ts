import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
import { VideoService } from "../video.service";


@Component({
  selector: 'app-videocenter',
  templateUrl: './videocenter.component.html',
  styleUrls: ['./videocenter.component.css'],
  providers: [VideoService],
})
export class VideocenterComponent implements OnInit {

  videos: Array<Video>;

  // videos: Video[] = [
  //   {_id: "id 1", "title": "title1", "url": "url 1", "description": "desc 1"},
  //   {_id: "id 2", "title": "title2", "url": "url 2", "description": "desc 2"},
  //   {_id: "id 3", "title": "title3", "url": "url 3", "description": "desc 3"},
  //   {_id: "id 4", "title": "title4", "url": "url 4", "description": "desc 4"}
  // ];
  selectedVideo: Video;
  constructor(private _videoService: VideoService) {}

  ngOnInit(): void {
    this._videoService
    .getVideos()
    .subscribe((resVideoData) => (this.videos = resVideoData));
  }

  onSelectVideo(video: any){
    this.selectedVideo = video;
    console.log(this.selectedVideo);
  }

}
