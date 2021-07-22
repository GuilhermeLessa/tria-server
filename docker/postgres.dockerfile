FROM postgres:13
LABEL maintainer="Guilherme Lessa"	
COPY /assets/database.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
EXPOSE 5432