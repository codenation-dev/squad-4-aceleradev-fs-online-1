FROM golang:1.12.0 as builder
WORKDIR /go/src/main
ENV GO111MODULE=on
COPY . .
WORKDIR /go/src/main/cmd
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -ldflags "-s -w" -o api
RUN cp api /go/bin/api
WORKDIR /go/src/main/cmd/app
RUN cp database.sql /go/bin/database.sql

FROM chromedp/headless-shell:latest

ENV PATH=$PATH:/headless-shell

COPY --from=builder /go/bin/api /
COPY --from=builder /go/bin/database.sql /app/

EXPOSE 3000
ENTRYPOINT [ "/api", "-param1=" ]