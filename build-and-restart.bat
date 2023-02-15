docker build . -t movie-gold
docker stop movie-gold
docker rm movie-gold
docker run -d -p 3000:3000 --name=movie-gold movie-gold