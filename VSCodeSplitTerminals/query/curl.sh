while true
do
     curl -X POST http://localhost:3000/ \
     -d '{"random_number": '$(( RANDOM % 100 + 1 ))'}'
     sleep 2     
done