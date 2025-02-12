for i in {1..1000}
do
  curl -X POST http://localhost:3000/ \
  -d '{"🧙Please": "🧙Subscribe!"}'
done