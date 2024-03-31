import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';interface SearchResult {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TestAngular';

  searchTerm: string = '';
  searchResults: SearchResult[] = [];
  selectedMovie: SearchResult | null = null;

  getMovieApi =
    'https://api.themoviedb.org/3/discover/movie?api_key=5c06fed2cdf4dfcdab132d9e67c1c2e7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   
    this.loadMovies();
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      
      const searchApi = `https://api.themoviedb.org/3/search/movie?api_key=5c06fed2cdf4dfcdab132d9e67c1c2e7&language=en-US&query=${this.searchTerm}&page=1&include_adult=false`;

      this.http.get(searchApi).subscribe((response: any) => {
        
        this.searchResults = response.results;
      });
    } else {
   
      this.loadMovies();
    }
  }

  loadMovies() {
    
    this.http.get(this.getMovieApi).subscribe((response: any) => {
      
      this.searchResults = response.results;
    });
  }

 
  showMovieDetails(movie: SearchResult) {
    this.selectedMovie = movie;
  }


  clearMovieDetails() {
    this.selectedMovie = null;
  }

 
  getImageUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
}{
}
