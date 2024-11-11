
class APIFeatures {
    query: any;
    queryString: any;
    constructor(_query, _queryString) {
        this.query = _query;
        this.queryString = _queryString;
    }

    filter() {
        // 1A) Basic filter
        const queryObj = { ...this.queryString };
        console.log('queryObj', queryObj);
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(element => delete queryObj[element])

        // 1B) Advanced filter
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => '$' + `${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        //  let query = Tour.find(JSON.parse(queryStr));
        return this;

        // Vd: 127.0.0.1:3000/api/v1/tours?difficulty=easy&duration=9
    }

    sort() {
        // 2) Sorting
        if (this.queryString.sort) {
            // Sắp xếp từ bé đến lớn, và ngược lại bằng cách thêm dấu "-"
            // 127.0.0.1:3000/api/v1/tours?sort=price
            // 127.0.0.1:3000/api/v1/tours?sort=-price
            // 127.0.0.1:3000/api/v1/tours?price=[lt]=1000&ratingsAverage[gte]=4.7
            // query = query.sort(request.query.sort);

            const sortBy = this.queryString.sort.split(',').join(' ');
            // 127.0.0.1:3000/api/v1/tours?sort=-price,-ratingsAverage
            console.log('sortBy: ', sortBy); // sortBy: -price -ratingsAverage
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt') // lấy thằng đc tạo mới nhất
        }

        return this;
    }

    limitFields() {
        // 3) Filed limiting
        // 127.0.0.1:3000/api/v1/tours?fields=name,price&limit=5
        // Với filed thì dấu trừ "-" có nghĩa là exclude nó ra khỏi list
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            // Hide __v when get data form api
            // this.query = this.query.select('-__v'); // đã ẩn bằng code bên tourModel
        }

        return this;
    }

    paginate() {
        const _page = this.queryString.page * 1 || 1;
        const _limit = this.queryString.limit * 1 || 20; // pageSize
        const _skip = (_page - 1) * _limit;

        // 127.0.0.1:3000/api/v1/tours?page=3&limit=10: 1 -> 10 is page 1, 11 -> 20 is page 2, 21 -> 30 is page 3
        this.query = this.query.skip(_skip).limit(_limit);

        // if (this.queryString.page) {
        //   const numTours = await Tour.countDocuments();
        //   if (_skip >= numTours) throw new Error('This page does not exist');
        // }
        return this;
    }
}

export default APIFeatures;